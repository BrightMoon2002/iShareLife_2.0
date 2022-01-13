import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostingComponent} from './posting/posting/posting.component';
import {RegisterComponent} from './form-login/register/register.component';
import {LogoutComponent} from './form-login/logout/logout.component';
import {LoginComponent} from './form-login/login/login.component';
import {UserAccountComponent} from './form-login/user-account/user-account.component';
import {NewComponent} from './new/new.component';
import {HomeComponent} from './home/home.component';
import {SecurityGuard} from './security.guard';

const routes: Routes = [
  {path: '',
  component: LoginComponent},
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home', canActivate: [SecurityGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        component: NewComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
