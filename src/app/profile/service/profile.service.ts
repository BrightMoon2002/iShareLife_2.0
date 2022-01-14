import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../../posting/model/account';
import {AccountDetail} from '../model/account-detail';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  findAccountById(id: number): Observable<AccountDetail> {
    return this.http.get<AccountDetail>(API + 'api/auth/' + id);
  }
}
