import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TokenService} from '../../../service/token/token.service';
import {Posting} from '../../model/posting';
import {Account} from '../../model/account';
import {PostingStatusType} from '../../model/postingStatusType';
import {PostingCreate} from '../../model/PostingCreate';
import {PostingService} from '../../service/posting.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-posting-create',
  templateUrl: './posting-create.component.html',
  styleUrls: ['./posting-create.component.scss']
})
export class PostingCreateComponent implements OnInit {
  selected = 1;
  form: any = {
    select: 1
  };
  postingStatusTypes: PostingStatusType[];
  posting: PostingCreate;
  avatar: string;
  @Output()
  postingChange = new EventEmitter();
  constructor(
    private tokenService: TokenService,
    private postingService: PostingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.avatar = this.tokenService.getAvatar();
    this.postingService.getAllStatusPostingType().subscribe(data => {
       this.postingStatusTypes = data;
    });
  }

  ngSubmit() {
    this.posting = new PostingCreate(this.form.content, Date.now().toString(), new Account(this.tokenService.getIdKey(), this.tokenService.getUsername(), this.tokenService.getName(), this.tokenService.getAvatar()), new PostingStatusType(this.form.select), 'aaaaa');
    this.postingService.create(this.posting).subscribe();
    this.postingChange.emit(this.posting);
    this.form.content = '';
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
  //               this.newPostings.push(this.posting);
  //               this.newPostings = this.newPostings.sort((a, b) => b.id - a.id);
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
