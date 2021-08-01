import { Injectable } from '@angular/core';
import {Notification} from "./notification.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notifications: Notification[] = [];

  constructor() {

  }

  pushNotifications(notification: Notification) {
    this.notifications.push(notification);
  }

  getNotifications() {
    return this.notifications;
  }
}
