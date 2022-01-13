import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar2',
  templateUrl: './nav-bar2.component.html',
  styleUrls: ['./nav-bar2.component.scss']
})
export class NavBar2Component implements OnInit {
  userSettings = document.querySelector('.user-settings');
  constructor() {
  }
  ngOnInit(): void {
  }

  UserSettingToggle(): void {
    alert(this.userSettings);
    // @ts-ignore

  }
}
