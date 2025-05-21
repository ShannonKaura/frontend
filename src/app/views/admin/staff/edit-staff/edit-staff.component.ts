
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Staff } from 'src/app/models/staff';
import { StaffService } from 'src/app/services/staff.service';
import { CountryService } from 'src/app/services/country.service';
import { IndustryService } from 'src/app/services/industry.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { ProjectService } from 'src/app/services/project.service';
import { AccessLevelService } from 'src/app/services/access-level.service';
import { JobService } from 'src/app/services/job.service';
import { CompanyDepartmentService } from 'src/app/services/company-department.service';


interface Qualifications {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent implements OnInit {

  public staff!: Staff;
  public maxDate: Date = new Date();
  public hide = true;
  public staff_id: any;
  public countries: any;
  public industries: any;
  public projects: any = [];
  public staff_emails = new Set();
  public jobs: any;
  public departments: any;
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
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private countryService: CountryService,
    private industryService: IndustryService,
    private dialog: MatDialog,
    private notifier: NotifierService,
    private accessLevel: AccessLevelService,
    private jobService: JobService,
    private compnayDepartmentService: CompanyDepartmentService,
  ) { }

  ngOnInit(): void {
    this.initStaff();
    this.getStaff();
    this.getCountries();
    this.getJobTitles();
    this.getIndustries();
    this.getCompanyDepartments();
    this.getStaffEmails();
  }

  // initialize staff model
  initStaff() {

    this.staff = {
      _id: '',
      personal_details: {
        staff_name: '',
        gender: '',
        national_identity_number: '',
        passport_number: '',
        date_of_birth: new Date(Date.now()),
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
        school: ''
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

  // get staff by Id
  getStaff() {
    const staffId = this.route.snapshot.paramMap.get('id');
    if (staffId) {
      this.staffService.getStaffById(staffId).subscribe(returnedstaff => {
        this.staff = returnedstaff;
      })
    }
  }

  //update staff
  updateStaff(staff: Staff) {
    this.staffService.updateStaff(staff).subscribe(updatedStaff => {
      this.staff = updatedStaff;
      if (this.staff) {
        this.notifier.Notification("success", "staff successfully updated.");
      } else {
        this.notifier.Notification("warning", "failed to update.");
      }
    })
  }

  //get projects associated with the staff

  getProjects() {
    const staffId = this.route.snapshot.paramMap.get('id');
    this.projectService.getAllProjects().subscribe((returned_projects: any) => {

      this.projects = returned_projects.filter((c: any) => c.staff_info.staff_id === staffId);

    })
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


}
