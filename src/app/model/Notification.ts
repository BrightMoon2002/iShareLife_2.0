import {Posting} from '../posting/model/posting';

export class Notification {
  id: number;
  content: string;
  sender: Account;
  account: Account;
  posting: Posting;
  status: boolean;

  constructor(content: string, sender: Account, account: Account, posting: Posting, status: boolean) {
    this.content = content;
    this.sender = sender;
    this.account = account;
    this.posting = posting;
    this.status = status;
  }
}
