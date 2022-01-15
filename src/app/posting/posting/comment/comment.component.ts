import {Component, Input, OnInit} from '@angular/core';
import {PostingService} from '../../service/posting.service';
import {StatusComment} from '../../model/StatusComment';
import {Account} from '../../model/account';
import {PostingComment} from '../../model/comment';
import {UploadImagesFormComponent} from '../../upload-images/upload-images-form/upload-images-form.component';
import {MatDialog} from '@angular/material/dialog';
import {CommentEditComponent} from './comment-edit/comment-edit.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input()
  comment: PostingComment;
  newContent: string;
  constructor(
    private postingService: PostingService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

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

  }
}
