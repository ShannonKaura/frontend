import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Staff } from 'src/app/models/staff';
import { StaffService } from 'src/app/services/staff.service';
import { CountryService } from 'src/app/services/country.service';
import { IndustryService } from 'src/app/services/industry.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { AccessLevelService } from 'src/app/services/access-level.service';
import { JobService } from 'src/app/services/job.service';
import { CompanyDepartmentService } from 'src/app/services/company-department.service';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

interface Qualifications {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-staff',
  templateUrl: './new-staff.component.html',
  styleUrls: ['./new-staff.component.scss']
})
export class NewStaffComponent implements OnInit {

  public staff!: Staff;
  public user!: User;
  public onStaffCreation = new EventEmitter();
  public maxDate: Date = new Date();
  public hide = true;
  isEditable = true;
  public countries: any;
  public jobs: any;
  public industries: any;
  public departments: any;

  public basic_details = true;
  public company_details = false;
  public contact_details = false;
  public staff_emails = new Set();
  public email_exists: boolean = false;
  public access_levels: any = [];

  public gender: string[] = ['male', 'female'];

  public qualifications: Qualifications[] = [
    { value: 'O Level', viewValue: '`O` Level' },
    { value: 'A Level', viewValue: '`A` Level' },
    { value: 'Diploma', viewValue: 'Diploma' },
    { value: 'Professional Certificate', viewValue: 'Professional Certificate' },
    { value: 'Undergraduate', viewValue: 'Undergraduate' },
    { value: 'Bachelors Degree', viewValue: 'Bachelor`s Degree' },
    { value: 'Masters degree', viewValue: 'Master`s degree' },
    { value: 'Phd', viewValue: 'Phd' },
  ];

  constructor(
    private staffService: StaffService,
    private countryService: CountryService,
    private jobService: JobService,
    private industryService: IndustryService,
    private dialogRef: MatDialogRef<NewStaffComponent>,
    private notifier: NotifierService,
    private accessLevel: AccessLevelService,
    private compnayDepartmentService: CompanyDepartmentService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.getUserById();
    this.initUser();
    this.initStaff();
    this.getCountries();
    this.getJobTitles();
    this.getIndustries();
    this.getCompanyDepartments();
    this.getStaffEmails();
  }

  // initialize staff model

  initUser() {
    this.user = {
      _id: '',
      main_user_info: {
        first_name: '',
        middle_name: '',
        last_name: ''
      },
      contact_info: {
        email_address: ''
      },
      access_level: '',
      password: '',
      email: '',
      status: '',
      created_by: '',
      created_date: {},
      delete: {}
    }
  }

  initStaff() {
    this.staff = {
      _id: '',
      personal_details: {
        staff_name: '',
        gender: '',
        national_identity_number: '',
        passport_number: '',
        date_of_birth: null,
        email: '',
        phone: '',
        audio_id: '',
        documents: []
      },

      job_details: {
        job_title: '',
        department: '',
        industry_category: '',
        start_date: new Date(Date.now()),
        end_date: new Date(0),
        employement_status: ''
      },

      next_of_kin_details: {
        next_of_kin_name: '',
        next_of_kin_phone_number: '',
        next_of_kin_relationship: '',
      },

      address_details: {
        country: '',
        country_code: '',
        city: '',
        home_address: '',

      },

      education_details: {
        qualification: '',
        school: '',
      },

      created_by: '',
      created_date: new Date(Date.now()),
    }
  }

  // get staff emails
  getStaffEmails() {
    this.staffService.getAllStaff().subscribe(data => {
      data.forEach((x: any) => {
        this.staff_emails.add(x.email);
      });
    })
  }

  getUserById() {
    const userId: any = this.tokenStorage.getUser().id;
    this.userService.getUserById(userId).subscribe(returned => {
      this.user = returned;
      console.log('sss', this.user)
    })
  }

  // add staff to database
  addStaff(staff: Staff) {
    if (this.staff_emails.has(this.staff.personal_details.email)) {
      this.email_exists = true;
      console.log("email already exists")
    } else {
      this.staff.created_by = this.user.main_user_info.first_name + ' ' + this.user.main_user_info.first_name;
      this.staffService.addStaff(staff).subscribe(createdStaff => {
        this.onStaffCreation.emit(staff);

        if (createdStaff) {
          this.notifier.Notification("success", "new staff successfully saved.");
          this.close()
        } else {
          this.notifier.Notification("warning", "failed to save.");
        }
      })
    }
  }

  getCountries() {
    this.countryService.getAllCountries().subscribe(returned_countries => {
      this.countries = returned_countries
    })
  }

  getJobTitles() {
    this.jobService.getAllJobs().subscribe(returned_jobs => {
      this.jobs = returned_jobs
    })
  }

  getCompanyDepartments() {
    this.compnayDepartmentService.getAllCompanyDepartments().subscribe(returned_departments => {
      this.departments = returned_departments
    })
  }

  getIndustries() {
    this.industryService.getAllIndustries().subscribe(returned_industries => {
      this.industries = returned_industries
    })
  }

  getAccessLevels() {
    this.accessLevel.getAllAccessLevels().subscribe((returned: any) => {
      this.access_levels = returned;
    })
  }

  onChangeDOBDate(event: any) {
    this.staff.personal_details.date_of_birth = event.value;
  }

  onChangeStartDate(event: any) {
    this.staff.job_details.start_date = event.value;
  }

  onChangeEndDate(event: any) {
    this.staff.job_details.end_date = event.value;
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
}
