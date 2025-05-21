
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, ContactInfo, MainUserInfo } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  public user!: User;
  public maxDate: Date = new Date();
  public hide = true;
  public main_user_info!: MainUserInfo;
  public contact_info!: ContactInfo;

  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public userdatainfo: any,
    private dialogRef: MatDialogRef<ViewUserComponent>,
  ) { }

  ngOnInit(): void {
    this.initUser();
    this.getUser();
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
      email: this.contact_info.email_address,
      password: '',
      status: '',
      created_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
      delete: {},
    }
  }

  // get user by Id
  getUser() {
    const userId = this.userdatainfo.id
    if (userId) {
      this.userService.getUserById(userId).subscribe(returneduser => {
        this.user = returneduser;
      })
    }
  }

  close() {
    this.dialogRef.close();
  }
}
