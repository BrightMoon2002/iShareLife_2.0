import {Account} from './account';
import {PostingStatusType} from './postingStatusType';

export class Posting {
  id?: any;
  content?: any;
  dateOfPosting?: Date;
  owner?: Account;
  postingStatusType: PostingStatusType;
  images?: string[];
  private Likes?: any;
  // dislikes?: number;
  private Tags?: Account[];

  constructor(id: any, content: any, dateOfPosting: Date, owner: Account, postingStatusType: PostingStatusType, images: string[]) {
    this.id = id;
    this.content = content;
    this.dateOfPosting = dateOfPosting;
    this.owner = owner;
    this.postingStatusType = postingStatusType;
    this.images = images;
  }


  get likes(): number {
    return this.Likes;
  }

  set likes(value: number) {
    this.Likes = value;
  }

  get tags(): Account[] | undefined {
    return this.Tags;
  }

  set tags(value: Account[] | undefined) {
    this.Tags = value;
  }
}
