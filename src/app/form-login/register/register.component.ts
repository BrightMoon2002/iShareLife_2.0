import { Component, OnInit } from '@angular/core';
import {SignUp} from '../../model/SignUp';
import {AuthService} from '../../service/auth/auth.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  status = 'Please fill the information to register';
  form: any = {};
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  signUpForm: SignUp;
  error1: any = {
    message: 'The username existed! Please try again!'
  };
  error2: any = {
    message: 'The email existed! Please try again!'
  };
  error3: any = {
    message: 'Create user success!'
  };


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  ngSubmit() {
    this.signUpForm = new SignUp(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    ),
    this.authService.signup(this.signUpForm).subscribe(data => {
      if (JSON.stringify(data) === JSON.stringify(this.error1)) {
        this.status = 'The username existed! Please try again';
      }
      if (JSON.stringify(data) === JSON.stringify(this.error2)) {
        this.status = 'The email existed! Please try again';
      }
      if (JSON.stringify(data) === JSON.stringify(this.error3)) {
        this.status = 'success';
      }
    });
  }
}
