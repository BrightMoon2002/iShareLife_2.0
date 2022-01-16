import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../service/profile.service';
import {AccountDetail} from '../model/account-detail';

@Component({
  selector: 'app-list-pending',
  templateUrl: './list-pending.component.html',
  styleUrls: ['./list-pending.component.scss']
})
export class ListPendingComponent implements OnInit {
  listPending: AccountDetail[] = [];

  constructor(private profileService: ProfileService) {
  }
  sumPending: number;
  ngOnInit(): void {
    this.showListPending();
  }

  showListPending() {
    this.profileService.listPending().subscribe(list => {
      this.listPending = list;
      console.log(list);
      this.sumPending = list.length;
    });
  }

  agreePending(id: number) {
    this.profileService.agree(id).subscribe();
    window.location.reload();
  }

  refusePending(id: number) {
    this.profileService.refusePending(id).subscribe();
    window.location.reload();

  }
}
