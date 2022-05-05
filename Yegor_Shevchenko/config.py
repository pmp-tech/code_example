"""Base configuration package."""
import logging

from typing import Any, Type

from enum import Enum

from pydantic import BaseSettings
from pydantic import PostgresDsn, SecretStr

from functools import lru_cache


class AppEnvTypes(Enum):
    """Declare possible env types."""

    prod: str = "prod"
    dev: str = "dev"
    test: str = "test"


class BaseAppSettings(BaseSettings):
    """Common patter for working with config."""

    app_env: AppEnvTypes = AppEnvTypes.prod

    class Config:
        """Specify env file."""

        env_file = ".env"


class AppSettings(BaseAppSettings):
    """Declare basic app settings."""

    # main fastapi settings
    debug: bool = False
    docs_url: str = "/docs"
    openapi_prefix: str = ""
    openapi_url: str = "/openapi.json"
    redoc_url: str = "/redoc"
    title: str = "FastAPI example application"
    version: str = "0.0.0"

    # database settings
    database_url: PostgresDsn
    max_connection_count: int = 10
    min_connection_count: int = 10

    # app settings
    secret_key: SecretStr

    api_prefix: str = "/api"

    jwt_token_prefix: str = "Token"

    allowed_hosts: list[str] = ["*"]
    # logger settings
    logging_level: int = logging.INFO
    loggers: tuple[str, str] = ("uvicorn.asgi", "uvicorn.access")

    class Config:
        """Validation on assignment to attributes."""

        validate_assignment = True

    @property
    def fastapi_kwargs(self) -> dict[str, Any]:
        """Get fastapi settings."""
        return {
            "debug": self.debug,
            "docs_url": self.docs_url,
            "openapi_prefix": self.openapi_prefix,
            "openapi_url": self.openapi_url,
            "redoc_url": self.redoc_url,
            "title": self.title,
            "version": self.version,
        }


class TestAppSettings(AppSettings):
    """Declare test settings."""

    debug: bool = True

    secret_key: SecretStr = SecretStr("test_secret")

    database_url: PostgresDsn
    max_connection_count: int = 1
    min_connection_count: int = 1

    logging_level: int = logging.DEBUG


class DevAppSettings(AppSettings):
    """Development settings config."""

    debug: bool = True

    title: str = "Dev FastAPI example application"

    logging_level: int = logging.DEBUG


class ProdAppSettings(AppSettings):
    """Production app settings."""

    class Config(AppSettings.Config):
        """Configure env file for production."""

        env_file = "prod.env"


environments: dict[AppEnvTypes, Type[AppSettings]] = {
    AppEnvTypes.dev: DevAppSettings,
    AppEnvTypes.prod: ProdAppSettings,
    AppEnvTypes.test: TestAppSettings,
}


@lru_cache
def get_app_settings() -> AppSettings:
    """Return configured app settings."""
    app_env = BaseAppSettings().app_env
    config = environments[app_env]
    return config()

