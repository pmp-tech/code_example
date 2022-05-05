import { makeAutoObservable } from "mobx";
import { api } from "utils/api";
import { fcmService } from "utils/FCMService";
import { rate } from "./User";

class User {
  id = null;
  email = null;
  role = null;
  accesses = [];
  name = "";
  is_notify = true;

  constructor() {
    makeAutoObservable(this);
  }

  setRole(role) {
    this.role = role;
  }

  setName(name) {
    this.name = name;
  }

  setAccesses(accesses) {
    this.accesses = accesses;
  }

  setNotification = (is_notify) => {
    api.setNotification(is_notify);
    this.is_notify = is_notify;
  };

  setId = (id) => {
    this.id = id;
  };

  setEmail = (email) => {
    this.email = email;
  };

  getId = () => this.id;

  //получаем и сетаем текущего юзера
  //регистрируем его в fcm и создаем канал для локальных уведомлений
  getUser = async () => {
    let user = await api.getMe();
    let accesses = [];
    if (user.manager_permission_cleaning) accesses.push("cleanings");
    if (user.manager_permission_check_lists) accesses.push("check_lists");
    if (user.manager_permission_users) accesses.push("workers");
    this.setId(user.id);
    this.setNotification(user.notification);
    this.setAccesses(accesses);
    this.setRole(user.role);
    this.setName(user.name);
    this.setEmail(user.email);
    rate.setIsSubscriptionActive(user.company?.active);
    fcmService.register();
    localNotificationService.createChannel();
  };

  //изменяем юзера
  //если имейл уже занят или ошибочек, то вернется ошибка, если нет, то будет null
  editUser = async () => {
    let is_email_error = await api.editUser(
      this.name,
      this.email,
      this.is_notify,
      this.role,
      this.accesses
    );
    return is_email_error;
  };
}

export const user = new User();
