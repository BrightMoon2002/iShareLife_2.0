import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../model/chat/Message';

import {TokenService} from '../service/token/token.service';
import {ChatService} from '../service/chat-message/chat.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input()
  messageDetail: Message[];
  nameReceiver: any;
  @Input()
  idAccountChat: number;
  idAccount = this.tokenService.getIdKey();
  nameAccount = this.tokenService.getName();
  avatarAccount = this.tokenService.getAvatar();

  constructor(
    chatService: ChatService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
  }



}
