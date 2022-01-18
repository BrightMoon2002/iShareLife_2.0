import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from '../service/token/token.service';
import {ChangePasswordComponent} from '../form-login/change-password/change-password.component';
import {MatDialog} from '@angular/material/dialog';
import {ChangePasswordRequest} from '../model/ChangePasswordRequest';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../service/auth/auth.service';
import {UpdateInfoComponent} from '../change/update-info/update-info.component';
import {UpdateInfoRequest} from '../model/UpdateInfoRequest';

@Component({
  selector: 'app-nav-bar2',
  templateUrl: './nav-bar2.component.html',
  styleUrls: ['./nav-bar2.component.scss']
})
export class NavBar2Component implements OnInit {
  id = window.sessionStorage.getItem('Id_Key');
// error for changePassword
  error1: any = {
    message: 'no_password'
  };
  error2: any = {
    message: 'success'
  };
  // error for update info

  error3: any = {
    message: 'yes'
  };

  userSettings = document.querySelector('.user-settings');
  name: any;
  isCheckLogin = false;
  avatar: any;
  changePasswordRequest: ChangePasswordRequest = {
    oldPassword: '',
    newPassword: ''
  };


  updateInfoRequest: UpdateInfoRequest = {
    name: '',
    email: '',
    hobbies: '',
    address: '',
    phone: ''
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
    this.router.navigate(['/home/profile/' + id]).then(() => {
      window.location.reload();
      window.scrollTo(0, 0);
    });
  }

  openDialogUpdateInfo() {
    const dialogRef = this.dialog.open(UpdateInfoComponent, {
        width: '800px',
        data: {
          name: this.updateInfoRequest.name,
          email: this.updateInfoRequest.email,
          hobbies: this.updateInfoRequest.hobbies,
          address: this.updateInfoRequest.address,
          phone: this.updateInfoRequest.phone
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.updateInfoRequest.name = result.name;
      this.updateInfoRequest.email = result.email;
      this.updateInfoRequest.hobbies = result.hobbies;
      console.log(this.updateInfoRequest.hobbies);
      this.updateInfoRequest.phone = result.phone;
      this.updateInfoRequest.address = result.address;
      this.authService.updateInfo(this.updateInfoRequest).subscribe(data => {
        if (JSON.stringify(data) === JSON.stringify(this.error3)) {
          alert('Change information success!');
        }
      });
    });
  }

  showMessenger() {
    this.router.navigate(['messenger-chat']);
  }
}
