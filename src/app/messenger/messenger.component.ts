import { Component, OnInit } from '@angular/core';
import {ChatService} from '../service/chat-message/chat.service';
import {MessageAccountResponse} from '../model/chat/MessageAccountResponse';
import {Message} from '../model/chat/Message';
import {TokenService} from '../service/token/token.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {
  messageAccount: MessageAccountResponse[];
  messageDetail: Message[];
  idAccountChat: number;
  avatarAccountChat: string;
  constructor(
    private messageService: ChatService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.showAllMessageByAccountId();
    console.log(this.messageAccount);
  }
  showAllMessageByAccountId() {
    this.messageService.getListMessageByAccountId().subscribe(data => {
      this.messageAccount = data;
      console.log(this.messageAccount[1].avatar);
    });
  }
  showChatLogById(id: number) {
    this.idAccountChat = id;
    this.messageService.showChatLogById(id).subscribe(data => {
      this.messageDetail = data;
    });
  }
}
