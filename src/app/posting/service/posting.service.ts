import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Posting} from '../model/posting';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class PostingService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Posting[]>{
    return this.http.get<Posting[]>(API + 'api/posting');
  }

  create(posting: Posting): Observable<Posting> {
    return this.http.post<Posting>(API + 'api/posting', posting);
  }

  update(id: number, posting: Posting): Observable<Posting> {
    return this.http.put<Posting>(API + 'api/posting/' + id, posting);
  }

  findById(id: number): Observable<Posting> {
    return this.http.get<Posting>(API + 'api/posting/' + id);
  }

  delete(id: number): Observable<Posting>{
    return this.http.delete<Posting>(API + 'api/delete/' + id);
  }

  findAllUrlByPostingId(id: any): Observable<string[]>{
    return this.http.get<string[]>(API + 'api/postingImage/posting/' + id);
  }

  getLikeByPostingId(id: any): Observable<number>{
    return this.http.get<number>(API + 'api/postLike/like/' + id);
  }
  isLikedByAccountId(pId: any, accId: any): Observable<boolean>{
    return this.http.get<boolean>(API + 'api/postLike/liked/' + pId + '/' + accId);
  }
  doLikePost(accId: number, pId: number): Observable<string> {
    return this.http.post<string>(API + 'api/postLike/doLike/' + pId + '/' + accId, {});
  }

  unLikePost(accId: number, pId: number): Observable<string> {
    return this.http.delete<string>(API + 'api/postLike/unLike/' + pId + '/' + accId);
  }
}
