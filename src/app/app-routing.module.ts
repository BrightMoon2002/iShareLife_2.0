import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostingComponent} from './posting/posting/posting.component';
import {RegisterComponent} from './form-login/register/register.component';
import {LogoutComponent} from './form-login/logout/logout.component';
import {LoginComponent} from './form-login/login/login.component';
import {UserAccountComponent} from './form-login/user-account/user-account.component';
import {NewComponent} from './new/new.component';

const routes: Routes = [
  {path: '',
  component: PostingComponent},
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user-account',
    component: UserAccountComponent,
    data: {title: 'User-Account'}
  },
  {
    path: 'new',
    component: NewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
