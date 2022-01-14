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
}
