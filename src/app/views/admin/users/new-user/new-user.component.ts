import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User, UserConfirm, ContactInfo, MainUserInfo } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { CountryService } from 'src/app/services/country.service';
import { IndustryService } from 'src/app/services/industry.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { AccessLevelService } from 'src/app/services/access-level.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  public user!: User;
  public confirm!: UserConfirm;
  public onUserCreation = new EventEmitter();
  public maxDate: Date = new Date();
  public hide = true;
  public main_user_info!: MainUserInfo;
  public contact_info!: ContactInfo;
  isEditable = true;
  public countries: any;
  public industries: any;

  public basic_details = true;
  public company_details = false;
  public contact_details = false;
  public user_emails: any = [];
  public email_exists: boolean = false;
  public access_levels: any = [];

  constructor(
    private userService: UserService,
    private countryService: CountryService,
    private industryService: IndustryService,
    private dialogRef: MatDialogRef<NewUserComponent>,
    private notifier: NotifierService,
    private accessLevel: AccessLevelService
  ) { }

  ngOnInit(): void {
    this.initUser();
    this.initConfirm();
    this.getCountries();
    this.getIndustries();
    this.getUserEmails();
    this.getAccessLevels();
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

  // get candidate emails
  getUserEmails() {
    this.userService.getAllUsers().subscribe(data => {
      data.forEach(x => {
        this.user_emails.push(x.email);
      });
    })
  }

  // add user to database
  addUser(user: User) {
    if (this.user_emails.includes(this.user.email)) {
      this.email_exists = true;
    } else {
      this.userService.addUser(user).subscribe(createdUser => {
        this.onUserCreation.emit(user);

        if (createdUser) {
          this.notifier.Notification("success", "new user successfully saved.");
          this.close()
        } else {
          this.notifier.Notification("warning", "failed to save.");
        }
      })
    }
  }

  AccessLevelChage(event: any) {
    console.log('hhhhh', event)
  }

  getCountries() {
    this.countryService.getAllCountries().subscribe(returned_countries => {
      this.countries = returned_countries
      console.log('countries', this.countries)
    })
  }

  getIndustries() {
    this.industryService.getAllIndustries().subscribe(returned_industries => {
      this.industries = returned_industries
      console.log('industries', this.industries)
    })
  }

  getAccessLevels() {
    this.accessLevel.getAllAccessLevels().subscribe((returned: any) => {
      this.access_levels = returned;
    })
  }


  close() {
    this.dialogRef.close();
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
