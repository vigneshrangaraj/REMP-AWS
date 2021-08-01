import { Component, OnInit } from '@angular/core';
import {NotificationsService} from "./notifications.service";
import {Notification} from "./notification.model";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[];

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.notifications = this.notificationsService.getNotifications();
  }

}
