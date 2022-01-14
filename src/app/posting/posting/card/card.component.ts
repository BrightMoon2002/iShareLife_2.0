import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Posting} from '../../model/posting';
import {Observable} from 'rxjs';
import {PostingService} from '../../service/posting.service';
import {TokenService} from '../../../service/token/token.service';
import {PostingComment} from '../../model/comment';
import {StatusComment} from '../../model/StatusComment';
import {Account} from '../../model/account';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  like: number;
  isLiked: boolean;
  @Input()
  posting: Posting;
  @Input()
  comments: any;
  avatarLogging: string;
  newComment: PostingComment;
  form: any = {};

  constructor(
    private postingService: PostingService,
    private tokenService: TokenService
  ) {
  }

  ngOnInit(): void {
    console.log(this.comments);
    this.postingService.getLikeByPostingId(this.posting.id).subscribe(data => {
      this.like = data;
    });
    this.postingService.isLikedByAccountId(this.posting.id, this.tokenService.getIdKey()).subscribe(data => {
      this.isLiked = data;
    });
    this.avatarLogging = this.tokenService.getAvatar();
  }

  likePost(postId: number) {
    this.postingService.isLikedByAccountId(postId, this.tokenService.getIdKey()).subscribe(data => {
      if (data === false) {
        this.postingService.doLikePost(Number(this.tokenService.getIdKey()), postId).subscribe();
        this.like++;
        this.isLiked = !data;
      } else {
        console.log(data + ' lon ma');
        this.postingService.unLikePost(Number(this.tokenService.getIdKey()), postId).subscribe();
        this.like--;
        this.isLiked = !data;
      }
    });
  }

  getAllComments(id: any) {
    this.postingService.getAllCommentsByPostingId(id).subscribe(comments => {
      this.comments = comments;
    });
  }

  onSubmit() {
    this.newComment = new PostingComment(this.form.content, Date.now().toString(), this.posting, new StatusComment(1, 'sent'), new Account(this.tokenService.getIdKey()));
    this.postingService.saveNewComment(this.newComment).subscribe(data => {
      this.getAllComments(this.posting.id);
      this.form.content = '';
      this.posting.commentNumber = this.posting.commentNumber + 1;
    }
    );
  }
}
