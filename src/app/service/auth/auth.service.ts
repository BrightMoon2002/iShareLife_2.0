import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {SignUp} from '../../model/SignUp';
import {Observable} from 'rxjs';
import {SignInForm} from '../../model/SignInForm';
import {JwtResponse} from '../../model/JwtResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_SIGNUP = environment.API_LOCAL_R + '/signup';

  private API_SIGNIN = environment.API_LOCAL_R + '/signin';
  constructor(private http: HttpClient) { }

  signup(signupForm: SignUp): Observable<any> {
    return this.http.post(this.API_SIGNUP, signupForm);
  }
  signIn(signInForm: SignInForm): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.API_SIGNIN, signInForm);
  }
}
