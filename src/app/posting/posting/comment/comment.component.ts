import {Component, Input, OnInit} from '@angular/core';
import {PostingService} from '../../service/posting.service';
import {StatusComment} from '../../model/StatusComment';
import {Account} from '../../model/account';
import {PostingComment} from '../../model/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input()
  comment: PostingComment;
  constructor(
    private postingService: PostingService
  ) { }

  ngOnInit(): void {

  }



}
