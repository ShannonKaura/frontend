
import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminUserComponent } from 'src/app/views/admin/users/admin-user/admin-user.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { ContactInfo, MainUserInfo, User } from 'src/app/models/user';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  public year = new Date(Date.now()).getFullYear();
  public isLoggenIn = false;
  public user!: User;
  public main_user_info!: MainUserInfo;
  public contact_info!: ContactInfo;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  reason = '';

  constructor(
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
  ) {

    //get user details
    if (this.tokenStorage.getToken()) {
      this.isLoggenIn = true;
    }

  }

  @HostBinding('class') className = '';

  ngOnInit(): void {
    this.getUserById();
    this.initUser();

    this.userService.getAllUsers().subscribe(() => {

    })
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
      access_level: {
        id: '',
        name: ''
      },
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
    const userId: any = this.tokenStorage.getUser().id;
    this.userService.getUserById(userId).subscribe(returned => {
      this.user = returned;
    })
  }

  //user user dialog
  AdminUser(): void {
    const dialogRef = this.dialog.open(AdminUserComponent, {
      width: '300px',
      maxHeight: '620px',
    });

    dialogRef.updatePosition({
      top: '4%',
      right: '1%',
    });
  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

}
