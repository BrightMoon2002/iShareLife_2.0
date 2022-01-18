import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
const API_NOTIFICATION = environment.API + 'notification/';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(id: number): Observable<Notification[]>{
    return this.http.get<Notification[]>(API_NOTIFICATION + id);
  }
  create(notification: Notification): Observable<Notification>{
    return this.http.post<Notification>(API_NOTIFICATION, notification);
  }
  delete(id: number): Observable<Notification>{
    return this.http.delete<Notification>(API_NOTIFICATION + id);
  }
}
