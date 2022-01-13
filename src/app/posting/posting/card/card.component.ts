import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Posting} from '../../model/posting';
import {Observable} from 'rxjs';
import {PostingService} from '../../service/posting.service';
import {TokenService} from '../../../service/token/token.service';

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

  constructor(
    private postingService: PostingService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.postingService.getLikeByPostingId(this.posting.id).subscribe(data => {
      this.like = data;
    });
    this.postingService.isLikedByAccountId(this.posting.id, this.tokenService.getIdKey()).subscribe(data => {
      this.isLiked = data;
    });
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
}
