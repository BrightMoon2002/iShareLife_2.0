import { Component, OnInit } from '@angular/core';
import {ChatService} from '../service/chat-message/chat.service';
import {MessageAccountResponse} from '../model/chat/MessageAccountResponse';
import {Message} from '../model/chat/Message';
import {TokenService} from '../service/token/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {
  messageAccount: MessageAccountResponse[];
  messageDetail: Message[];
  idAccountChat = window.sessionStorage.getItem('idAccountChat');
  avatarAccountChat: string;
  constructor(
    private messageService: ChatService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showAllMessageByAccountId();
    setTimeout(() => {
      this.messageService.showChatLogById(this.messageAccount[0].idSender).subscribe(data => {
        this.messageDetail = data;
        window.sessionStorage.setItem('idAccountChat', this.messageAccount[0].idSender.toString());
      });
    }, 500);
  }
  showAllMessageByAccountId() {
    this.messageService.getListMessageByAccountId().subscribe(data => {
      this.messageAccount = data;
    });
  }
  showChatLogById(id: any) {
    this.idAccountChat = id;
    window.sessionStorage.setItem('idAccountChat', this.idAccountChat.toString());
    this.messageService.showChatLogById(id).subscribe(data => {
      this.messageDetail = data;
    });
  }
}
