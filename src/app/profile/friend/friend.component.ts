import {Component, OnInit} from '@angular/core';
import {AccountDetail} from '../model/account-detail';
import {FriendService} from '../service/friend.service';


@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  friends: AccountDetail[] = [];

  constructor(private friendService: FriendService) {
  }

  ngOnInit(): void {
    this.getListFriend();
  }

  getListFriend() {
    this.friendService.getAllFriend().subscribe(listFriend => {
      this.friends = listFriend;
    });
  }

}
