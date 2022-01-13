export class Account {
  id?: any;
  username?: string;
  name?: string;
  avatar?: string;


  constructor(id?: any, username?: string, name?: string, avatar?: string) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.avatar = avatar;
  }
}
