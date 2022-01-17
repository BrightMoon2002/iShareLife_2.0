import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostingService} from '../../service/posting.service';
import {StatusComment} from '../../model/StatusComment';
import {Account} from '../../model/account';
import {PostingComment} from '../../model/comment';
import {UploadImagesFormComponent} from '../../upload-images/upload-images-form/upload-images-form.component';
import {MatDialog} from '@angular/material/dialog';
import {CommentEditComponent} from './comment-edit/comment-edit.component';
import {CommentDeleteComponent} from './comment-delete/comment-delete.component';
import {TokenService} from '../../../service/token/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input()
  comment: PostingComment;
  newContent: string;
  @Output()
  idCommentDelete = new EventEmitter();
  idLogging: number;
  constructor(
    private postingService: PostingService,
    public dialog: MatDialog,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idLogging = Number(this.tokenService.getIdKey());
  }

  openDialogEdit() {
    const dialogRef = this.dialog.open(CommentEditComponent, {
      width: '500px',
      data: {newContent: this.newContent}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.comment.content = result;
      this.postingService.updateComment(this.comment.id, this.comment).subscribe();
      console.log('The dialog was closed');
    });
  }


  openDialogDelete() {
    const dialogRef = this.dialog.open(CommentDeleteComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.idCommentDelete.emit(this.comment.id);
      console.log('The dialog was closed');
    });
  }

  navigateToProfile(id: any) {
    window.sessionStorage.setItem('Id_Profile', id);
    this.router.navigate(['/home/profile/' + id]).then(() => {
      window.location.reload();
      window.scrollTo(0, 0);
    });

  }
}
