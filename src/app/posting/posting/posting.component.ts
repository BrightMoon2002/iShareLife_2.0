import {Component, Input, OnInit} from '@angular/core';
import {PostingService} from '../service/posting.service';
import {Posting} from '../model/posting';
import {Account} from '../model/account';
import {PostingComment} from '../model/comment';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.css']
})
export class PostingComponent implements OnInit {
  comment: PostingComment;
  @Input()
  postings: Posting[];
  posting: Posting;
  constructor(
    private postingService: PostingService
  ) { }

  ngOnInit(): void {

  }
  // getAll(): void {
  //   this.postingService.getAll().subscribe(data => {
  //     for (let i = 0; data.length; i++) {
  //       this.postingService.findAllUrlByPostingId(data[i].id).subscribe(images => {
  //         this.postingService.getLikeByPostingId(data[i].id).subscribe(likes => {
  //           this.postingService.getCommentsByPostingId(data[i].id).subscribe(comments => {
  //             this.postingService.getAllCommentsByPostingId(data[i].id).subscribe(commentsAll => {
  //               this.posting = new Posting(data[i].id, data[i].content, data[i].dateOfPosting, new Account(data[i].owner.id, data[i].owner.username, data[i].owner.name, data[i].owner.avatar), data[i].postingStatusType, images);
  //               this.posting.likes = likes;
  //               this.posting.commentNumber = commentsAll.length;
  //               this.posting.comments = comments;
  //               this.postings.push(this.posting);
  //               // if (this.newPosting !== null) {
  //               //   this.postings.push(this.newPosting);
  //               // }
  //               // console.log(this.postings);
  //             });
  //           });
  //         });
  //       });
  //     }
  //   });
  // }

}
