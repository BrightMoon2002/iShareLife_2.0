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
  messageAccount: MessageAccountResponse;
  messageAccounts: MessageAccountResponse[];
  messageDetail: Message[];
  idAccountChat = window.sessionStorage.getItem('idAccountChat');
  avatarAccountChat: string;
  constructor(
    private messageService: ChatService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.messageService.getListMessageByAccountId().subscribe(data => {
        this.messageService.showChatLogById(data[0].idSender).subscribe(detail => {
          this.messageAccounts = data;
          this.messageAccount = this.messageAccounts[0];
          this.messageDetail = detail;
        });
      });

  }

  showChatLogById(messageAccount: MessageAccountResponse) {
      this.messageService.showChatLogById(messageAccount.idSender).subscribe(data => {
        this.messageAccount = this.messageAccounts[this.messageAccounts.indexOf(messageAccount)];
        this.messageDetail = data;
        console.log(this.messageDetail);
      });
  }
}
