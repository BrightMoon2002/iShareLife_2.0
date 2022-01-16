import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  @Output()
  idDeletePosting = new EventEmitter();

  @Output()
  commentIdDelete = new EventEmitter();
  constructor(
    private postingService: PostingService
  ) { }

  ngOnInit(): void {

  }

  delete($event: any) {
    this.idDeletePosting.emit($event);
  }

  deleteComment($event: any) {
    this.commentIdDelete.emit($event);
  }
}
