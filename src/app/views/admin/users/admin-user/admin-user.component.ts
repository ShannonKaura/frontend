import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContactInfo, MainUserInfo, User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  public isLoggedIn = false;
  public user!: User;
  public main_user_info!: MainUserInfo;
  public contact_info!: ContactInfo;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private dialogRef: MatDialogRef<AdminUserComponent>,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      console.log(this.user)
    };

    this.getUserById();
    this.initUser();

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

  //get currentUser
  getUserById() {
    const userId: any = this.tokenStorageService.getUser().id;
    this.userService.getUserById(userId).subscribe(returned => {
      this.user = returned;
    })
  }

  UpdatePassword() {
    const url = `/update-admin-password`;
    this.router.navigate([url]);
    this.dialogRef.close();
  }

  ViewProfile() {
    const url = `/profile/${this.user._id}`;
    this.router.navigate([url]);
    this.dialogRef.close();
  }

  Logout() {
    if (this.isLoggedIn) {
      this.tokenStorageService.signOut();
      this.router.navigate(['/admin-login']);
      this.dialogRef.close();
      console.log('OUT')
    }
  }

}

