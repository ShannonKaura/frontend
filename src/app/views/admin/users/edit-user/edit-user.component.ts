import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { User, UserConfirm, ContactInfo, MainUserInfo } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'src/app/services/notifier.service';
import { AccessLevelService } from 'src/app/services/access-level.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public user!: any;
  public confirm!: UserConfirm;
  public onUserCreation = new EventEmitter();
  public maxDate: Date = new Date();
  public hide = true;
  public main_user_info!: MainUserInfo;
  public contact_info!: ContactInfo;
  public isEditable = true;
  public countries: any;
  public industries: any;

  public basic_details = true;
  public company_details = false;
  public contact_details = false;
  public email_exists: boolean = false;
  public user_emails: any = [];

  public access_levels: any = [];
  public access_level: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private notifier: NotifierService,
    private accessLevel: AccessLevelService
  ) { }

  ngOnInit(): void {
    this.initUser();
    this.initConfirm();
    this.getUser();
    this.getUserEmails();
    this.getAccessLevels()
  }

  // initialize confirm password
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

  getUserEmails() {
    this.userService.getAllUsers().subscribe(data => {
      data.forEach(x => {
        this.user_emails.push(x.email);
      });
    })
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
      country: '',
      country_code: '',
      password: '',
      email: this.contact_info.email_address,
      account_type: 'admin',
      status: '',
      original_user_record: {},
      modified_user_records: [],
      created_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
      delete: {},
    }
  }

  // get user by Id
  getUser() {
    // const userId = this.userdatainfo._id;
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(userId).subscribe(returneduser => {
        this.user = returneduser;

        if (!this.user.access_level) {
          this.user.access_level = {};
        }
      })
    }
  }

  //update user
  updateUser(user: User) {
    this.email_exists = false;
    this.userService.updateUser(user).subscribe(updatedUser => {
      this.user = updatedUser;

      if (this.user) {
        this.notifier.Notification("success", "user successfully updated.");
      } else {
        this.notifier.Notification("warning", "failed to update.");
      }
    })
  }

  getAccessLevels() {
    this.accessLevel.getAllAccessLevels().subscribe((returned: any) => {
      this.access_levels = returned;
    })
  }

  BackToBasicDetails() {
    this.basic_details = true;
    this.contact_details = false;
  }

  NextToContactDetails() {
    this.basic_details = false;
    this.contact_details = true;
  }

  inputEmail() {
    this.user.email = this.user.contact_info.email_address;
  }


}
