import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from '../service/token/token.service';
import {ChangePasswordComponent} from '../form-login/change-password/change-password.component';
import {MatDialog} from '@angular/material/dialog';
import {ChangePasswordRequest} from '../model/ChangePasswordRequest';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../service/auth/auth.service';

@Component({
  selector: 'app-nav-bar2',
  templateUrl: './nav-bar2.component.html',
  styleUrls: ['./nav-bar2.component.scss']
})
export class NavBar2Component implements OnInit {
  id = window.sessionStorage.getItem('Id_Key');

  error1: any = {
    message: 'no_password'
  };
  error2: any = {
    message: 'success'
  };

  userSettings = document.querySelector('.user-settings');
  name: any;
  isCheckLogin = false;
  avatar: any;
  changePasswordRequest: ChangePasswordRequest = {
    oldPassword: '',
    newPassword: ''
  };

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isCheckLogin = true;
      this.name = this.tokenService.getName();
      this.avatar = this.tokenService.getAvatar();
    }
  }

  logout(): void {
    window.sessionStorage.clear();
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }

  UserSettingToggle(): void {
    alert(this.userSettings);
    // @ts-ignore
  }

  openDialogChangePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
        width: '600px',
        data: {
          oldPassword: this.changePasswordRequest.oldPassword,
          newPassword: this.changePasswordRequest.newPassword
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.changePasswordRequest.oldPassword = result.oldPassword;
      this.changePasswordRequest.newPassword = result.newPassword;
      this.authService.changePassword(this.changePasswordRequest).subscribe(data => {
        if (JSON.stringify(data) === JSON.stringify(this.error1)) {
          alert('old password wrrong');
        }
        if (JSON.stringify(data) === JSON.stringify(this.error2)) {
          alert('Change password success!');
        }
      });
    });
  }

  navigateToProfile(id: string) {
    window.sessionStorage.setItem('Id_Profile', id);
    this.router.navigate(['/home/profile/' + id ]);
  }
}
