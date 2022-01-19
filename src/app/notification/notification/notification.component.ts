import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NotificationService} from '../service/notification.service';
import {TokenService} from '../../service/token/token.service';
import {Notifications} from '../../model/Notifications';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input()
  notifications: Notifications[] = [];
  @Output()
  posting = new EventEmitter();
  notification: Notifications;
  constructor(
    private notificationService: NotificationService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
  }

  getPostingId(notification: Notifications) {
    this.posting.emit(notification);
    notification.status = true;
    this.notification = new Notifications(notification.content, notification.sender, notification.account, notification.posting, true);
    this.notification.id = notification.id;
    this.notificationService.update(notification.id).subscribe();
  }
}
