import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../model/chat/Message';

import {TokenService} from '../service/token/token.service';
import {ChatService} from '../service/chat-message/chat.service';
import {ProfileService} from '../profile/service/profile.service';
import {Router} from '@angular/router';
import {MessageAccountResponse} from '../model/chat/MessageAccountResponse';

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
  idAccountChat: any;

  @Input()
  chatMessageAccount: MessageAccountResponse;
  avatarAccountChat: string;
  nameAccountChat: string;
  idAccount = this.tokenService.getIdKey();
  nameAccount = this.tokenService.getName();
  avatarAccount = this.tokenService.getAvatar();


  constructor(
    chatService: ChatService,
    private tokenService: TokenService,
    private profileService: ProfileService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
    this.findAccountById();
  }, 500);
  }

findAccountById() {
  this.idAccountChat = (Number)(window.sessionStorage.getItem('idAccountChat'));
      this.profileService.findAccountById(this.idAccountChat).subscribe(data => {
        this.avatarAccountChat = data.avatar;
        console.log(data.avatar);
        this.nameAccountChat  = data.name;
      });
}


}
