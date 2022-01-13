import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './form-login/register/register.component';
import {LoginComponent} from './form-login/login/login.component';
import {NewComponent} from './new/new.component';
import {HomeComponent} from './home/home.component';
import {SecurityGuard} from './security.guard';
import {ProfileComponent} from './profile/profile.component';
import {TimeLineComponent} from './profile/time-line/time-line.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
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
      },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          {
            path: '',
            component: TimeLineComponent
          }
        ]
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
