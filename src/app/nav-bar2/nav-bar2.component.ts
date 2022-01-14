import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from '../service/token/token.service';

@Component({
  selector: 'app-nav-bar2',
  templateUrl: './nav-bar2.component.html',
  styleUrls: ['./nav-bar2.component.scss']
})
export class NavBar2Component implements OnInit {
  id = window.sessionStorage.getItem('Id_Key');

  userSettings = document.querySelector('.user-settings');
  name: any;
  isCheckLogin = false;
  avatar: any;
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {
  }
  ngOnInit(): void {
    if (this.tokenService.getToken()){
      this.isCheckLogin = true;
      this.name = this.tokenService.getName();
      this.avatar = this.tokenService.getAvatar();
    }
  }
  logout(): void{
    window.sessionStorage.clear();
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }
  UserSettingToggle(): void {
    alert(this.userSettings);
    // @ts-ignore
  }
}
