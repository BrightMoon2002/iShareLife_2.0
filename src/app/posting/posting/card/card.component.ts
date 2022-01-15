import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Posting} from '../../model/posting';
import {Observable} from 'rxjs';
import {PostingService} from '../../service/posting.service';
import {TokenService} from '../../../service/token/token.service';
import {PostingComment} from '../../model/comment';
import {StatusComment} from '../../model/StatusComment';
import {Account} from '../../model/account';
import {any} from 'codelyzer/util/function';
import {PostingCreate} from '../../model/PostingCreate';
import {PostingStatusType} from '../../model/postingStatusType';
import {UploadImagesFormComponent} from '../../upload-images/upload-images-form/upload-images-form.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {PostingEditComponent} from '../posting-edit/posting-edit.component';
import {PostingDeleteComponent} from '../posting-delete/posting-delete.component';

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

  selected = 1;
  formEdit: any = {
    select: 1
  };
  postingStatusTypes: PostingStatusType[];
  postingEdit: PostingCreate;
  avatar: string;
  @Output()
  postingChange = new EventEmitter();
  urls: string[];
  imagesJoin: string;

  @Output()
  postingIdDelete = new EventEmitter();

  constructor(
    private postingService: PostingService,
    private tokenService: TokenService,
    private router: Router,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
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


  ngSubmit() {
    this.postingEdit = new PostingCreate(this.form.content, Date.now().toString(), new Account(this.tokenService.getIdKey(), this.tokenService.getUsername(), this.tokenService.getName(), this.tokenService.getAvatar()), new PostingStatusType(this.form.select), this.imagesJoin);
    this.postingService.create(this.postingEdit).subscribe();
    this.imagesJoin = null;
    this.urls = null;
    this.postingChange.emit(this.postingEdit);
    this.formEdit.content = '';
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(PostingEditComponent, {
      width: '1000px',
      data: {urls: this.urls, posting: this.posting}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.urls = result;
      this.imagesJoin = this.urls.join(',');
    });
  }

  openDialogDelete() {
    const dialogRef = this.dialog.open(PostingDeleteComponent, {
      width: '1000px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.postingIdDelete.emit(this.posting.id);
    });
  }
}
