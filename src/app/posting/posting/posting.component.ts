import { Component, OnInit } from '@angular/core';
import {PostingService} from '../service/posting.service';
import {Posting} from '../model/posting';
import {Account} from '../model/account';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.css']
})
export class PostingComponent implements OnInit {

  postings: Posting[] = [];
  posting: Posting;
  constructor(
    private postingService: PostingService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(): void {
    this.postingService.getAll().subscribe(data => {
      for (let i = 0; data.length; i++) {
        this.postingService.findAllUrlByPostingId(data[i].id).subscribe(images => {
          this.postingService.getLikeByPostingId(data[i].id).subscribe(likes => {
            this.posting = new Posting(data[i].id, data[i].content, data[i].dateOfPosting, new Account(data[i].owner.username, data[i].owner.name, data[i].owner.avatar), data[i].postingStatusType, images);
            this.posting.likes = likes;
            this.postings.push(this.posting);
          });
        });
      }
    });
  }

}
