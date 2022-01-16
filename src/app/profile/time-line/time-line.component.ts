import { Component, OnInit } from '@angular/core';
import {Posting} from '../../posting/model/posting';
import {Account} from '../../posting/model/account';
import {PostingService} from '../../posting/service/posting.service';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {
  posting: Posting;
  newPostings: Posting[] = [];
  constructor(private postingService: PostingService) { }

  ngOnInit(): void {
    this.getAll();
  }

  create($event: any) {
    this.newPostings = [];
    this.getAll();
    console.log(this.newPostings);

    // this.postingNew = $event;
    // this.newPostings.push(this.postingNew);
    // this.getAll();
  }

  getAll(): void {
    setTimeout(() => {this.postingService.getAll().subscribe(data => {
      for (let i = 0; data.length; i++) {
        this.postingService.findAllUrlByPostingId(data[i].id).subscribe(images => {
          this.postingService.getLikeByPostingId(data[i].id).subscribe(likes => {
            this.postingService.getCommentsByPostingId(data[i].id).subscribe(comments => {
              this.postingService.getAllCommentsByPostingId(data[i].id).subscribe(commentsAll => {
                this.posting = new Posting(data[i].id, data[i].content, data[i].dateOfPosting, new Account(data[i].owner.id, data[i].owner.username, data[i].owner.name, data[i].owner.avatar), data[i].postingStatusType);
                this.posting.likes = likes;
                this.posting.commentNumber = commentsAll.length;
                this.posting.comments = comments;
                this.posting._imagesArray = images;
                this.newPostings.push(this.posting);
                this.newPostings = this.newPostings.sort((a, b) => b.id - a.id);
              });
            });
          });
        });
      }
    });
    }, 1000);
  }

  deletePosting($event: any) {
    this.postingService.delete($event).subscribe();
    this.newPostings = [];
    this.getAll();
  }

  deleteComment($event: any) {
    this.postingService.deleteComment($event).subscribe();
    this.newPostings = [];
    this.getAll();
  }

}
