export class Account {
  id?: number;
  username?: string;
  name?: string;
  avatar?: string;


  constructor(username: string, name: string, avatar: string) {
    this.username = username;
    this.name = name;
    this.avatar = avatar;
  }
}
