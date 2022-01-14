import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar2',
  templateUrl: './nav-bar2.component.html',
  styleUrls: ['./nav-bar2.component.scss']
})
export class NavBar2Component implements OnInit {
  id = window.sessionStorage.getItem('Id_Key');

  userSettings = document.querySelector('.user-settings');
  constructor(
    private router: Router
  ) {
  }
  ngOnInit(): void {
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
