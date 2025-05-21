import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactInfo, MainUserInfo, User, UserConfirm } from 'src/app/models/user';
import { AdminGenerateCodeService } from 'src/app/services/admin-generate-code.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-admin-password',
  templateUrl: './update-admin-password.component.html',
  styleUrls: ['./update-admin-password.component.scss']
})
export class UpdateAdminPasswordComponent implements OnInit {

  public user!: User;
  public confirm!: UserConfirm;
  public hide = true;
  public isLoggedIn = false;
  public main_user_info!: MainUserInfo;
  public contact_info!: ContactInfo;
  public adminuser: any;
  public resetPasswordCodeData: any;
  public resetPasswordCodeDataString: any;
  public adminId: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private adminGenerateCodeService: AdminGenerateCodeService,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.initConfirm();
    this.initUser();

    // get reset user admin from storage
    this.resetPasswordCodeDataString = this.adminGenerateCodeService.getData();
    this.resetPasswordCodeData = JSON.parse(this.resetPasswordCodeDataString);
  }

  initConfirm(): void {
    this.confirm = {
      confirm_password: '',
    }
  }

  // initialize main user info
  initMainUserInfo() {
    this.main_user_info = {
      first_name: '',
      middle_name: '',
      last_name: '',
    }
  }

  // initialize contact info
  initContactInfo() {
    this.contact_info = {
      email_address: '',
    }
  }

  // initialize user model
  initUser() {

    this.initMainUserInfo();
    this.initContactInfo();

    this.user = {
      _id: '',
      main_user_info: this.main_user_info,
      contact_info: this.contact_info,
      access_level: {},
      email: '',
      password: '',
      status: '',
      created_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
      delete: {},
    }
  }


  updatePassword() {
    this.userService.getAllUsers().subscribe(returned => {
      this.adminuser = returned.filter(c => c.email === this.resetPasswordCodeData.email);

      if (this.adminuser.length > 0 && this.user.password !== '' && this.confirm.confirm_password === this.user.password) {
        this.adminId = this.adminuser[0]._id;

        // reset the password by updating user

        this.adminuser[0].password = this.user.password;

        this.userService.updateUserPassword(this.adminuser[0]).subscribe(updated_user => {
          this.user = updated_user;
          const url = `/admin-login`;

          this.notifier.Notification("success", "Password update successful");
          this.router.navigate([url]);
        })
      }
    });
  }
}
