export class Message {
  id?: number;
  content?: string;
  dateSender?: string;
  nameReceiver?: string;
  nameSender?: string;


  constructor(id?: number, content?: string, dateSender?: string, nameReceiver?: string, nameSender?: string) {
    this.id = id;
    this.content = content;
    this.dateSender = dateSender;
    this.nameReceiver = nameReceiver;
    this.nameSender = nameSender;
  }
}
