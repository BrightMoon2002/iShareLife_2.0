import { Component, OnInit } from '@angular/core';
import {SignInForm} from '../../model/SignInForm';
import {Router} from '@angular/router';
import {TokenService} from '../../service/token/token.service';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  status = 'Please Login to use the SocialNet';
  form: any = {};
  roles: string[] = [];
  name: string;
  signInForm: SignInForm;
  isCheckLoginFailed = false;
  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngSubmit() {
    this.signInForm = new SignInForm(
      this.form.username,
      this.form.password
    );
    this.authService.signIn(this.signInForm).subscribe(data => {
      if (data.token !== undefined) {
        this.tokenService.setToken(data.token);
        this.tokenService.setName(data.name);
        this.tokenService.setRoles(data.roles);
        this.tokenService.setIdKey(data.id);
        this.router.navigate(['new']).then(() => {
          window.location.reload();
        });
      } else {
        this.isCheckLoginFailed = true;
        this.status = 'LOGIN FAILED! Please try again!';
      }
    });
  }

}
