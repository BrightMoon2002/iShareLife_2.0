import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../service/notification.service';
import {TokenService} from '../../service/token/token.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];
  currentId: number;
  constructor(
    private notificationService: NotificationService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.currentId = +this.tokenService.getIdKey();
    this.getAll();
  }
  getAll(){
    this.notificationService.getAll(this.currentId).subscribe(data => {
      this.notifications = data;
      console.log(data);
      console.log(this.notifications);
    });
  }
}
