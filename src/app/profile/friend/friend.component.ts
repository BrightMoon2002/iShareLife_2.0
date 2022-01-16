import {Component, OnInit, OnChanges} from '@angular/core';
import {AccountDetail} from '../model/account-detail';
import {FriendService} from '../service/friend.service';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../service/profile.service';


@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  friends: AccountDetail[] = [];
  id: number;

  constructor(private friendService: FriendService,
              private activeRouter: ActivatedRoute,
              private profileService: ProfileService
  ) {
  }

  sumFriend: number;

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(accountId => {
      const id = +accountId.get('id1');
      this.id = id;
      this.getListFriend();
    });
  }

  getListFriend() {
    this.friendService.getAllFriend(this.id).subscribe(listFriend => {
      this.friends = listFriend;
      this.sumFriend = listFriend.length;
    });
  }


  deleteFriend(id: number) {
    this.profileService.deleteFriend(id).subscribe();
    window.location.reload();
  }
}
