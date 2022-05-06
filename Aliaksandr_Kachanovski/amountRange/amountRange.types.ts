export interface AmountOperator {
    value: FilterOperator | "range";
    symbol: string;
}

export enum FilterOperator {
    EQUALS = "eq",
    LESS_THAN = "lt",
    LESS_OR_EQUALS_THAN = "lte",
    GREATER_THAN = "gt",
    GREATER_OR_EQUALS_THAN = "gte",
    NOT_EQUALS = "not_eq",
    LIKE = "*",
    RANGE = "range",
}
