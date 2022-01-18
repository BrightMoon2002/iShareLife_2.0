export class Message {
  id?: number;
  content?: string;
  idGuest?: number;
  dateSend?: string;
  nameReceiver?: string;
  nameSender?: string;
  constructor(id?: number, content?: string, idGuest?: number, dateSend?: string, nameReceiver?: string, nameSender?: string) {
    this.id = id;
    this.content = content;
    this.idGuest = idGuest;
    this.dateSend = dateSend;
    this.nameReceiver = nameReceiver;
    this.nameSender = nameSender;
  }
}
