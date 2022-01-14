import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Posting} from '../posting/model/posting';
import {Account} from '../posting/model/account';
import {PostingService} from '../posting/service/posting.service';
import {PostingCreate} from '../posting/model/PostingCreate';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit, OnChanges {
  posting: Posting;
  newPostings: Posting[] = [];
  postingNew: PostingCreate;

  constructor(
    private postingService: PostingService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    }

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
                  this.posting = new Posting(data[i].id, data[i].content, data[i].dateOfPosting, new Account(data[i].owner.id, data[i].owner.username, data[i].owner.name, data[i].owner.avatar), data[i].postingStatusType, images);
                  this.posting.likes = likes;
                  this.posting.commentNumber = commentsAll.length;
                  this.posting.comments = comments;
                  this.newPostings.push(this.posting);
                  this.newPostings = this.newPostings.sort((a, b) => b.id - a.id);
                  // if (this.newPosting !== null) {
                  //   this.postings.push(this.newPosting);
                  // }
                  // console.log(this.postings);
                });
              });
            });
          });
        }
      });
    }, 1000);
  }
}
