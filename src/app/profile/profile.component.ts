import {Component, OnInit} from '@angular/core';
import {AccountDetail} from './model/account-detail';
import {ProfileService} from './service/profile.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  account: AccountDetail;

  constructor(private profileService: ProfileService,
              private activeRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(accountId => {
      const id = +accountId.get('id');
      this.profileService.findAccountById(id).subscribe(account => {
        this.account = account;
      });
    });
  }

}
