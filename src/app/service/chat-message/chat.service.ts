import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../../model/chat/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private API_URL = environment.API;

  constructor(private http: HttpClient) { }
  getListMessage(): Observable<Message[]> {
    return this.http.get<Message[]>(this.API_URL);
  }
  createMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.API_URL + '/chats', message);
  }
}
