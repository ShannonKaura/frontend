import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Candidate, CandidateConfirm, Education, Experience } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { CountryService } from 'src/app/services/country.service';
import { NotifierService } from 'src/app/services/notifier.service';

interface Role {
  value: string;
  viewValue: string;
}

interface RoleGroup {
  disabled?: boolean;
  name: string;
  role: Role[];
}

interface EmpymentType {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-new-candidate',
  templateUrl: './new-candidate.component.html',
  styleUrls: ['./new-candidate.component.scss']
})
export class NewCandidateComponent implements OnInit {

  public hide = true;
  public candidate_form = true;
  public client = false;
  public email_password_view = true;
  public names_view = false;
  public location_view = false;
  public employment_view = false;
  public confirm_email_view = false;
  public availability_view = false;
  public experience_view = false;
  public graduate_view = false;
  public student_view = false;
  public candidate!: Candidate;
  public confirm!: CandidateConfirm;
  public email_exists: boolean = false;
  public education_view = false;
  public new_candidate = true;
  public countries: any;
  public candidate_emails: any = [];


  public roleGroups: RoleGroup[] = [
    {
      name: 'Call centre agents',
      role: [
        {
          value: 'Outbound call centre agent', viewValue: 'Outbound call centre agent'
        },
        { value: 'Inbound call centre agent', viewValue: 'Inbound call centre agent' }
      ]
    },
    {
      name: 'Information Technology',
      role: [
        { value: 'Digital marketer', viewValue: 'Digital marketer' },
        { value: 'Graphic designer', viewValue: 'Graphic designer' },
        { value: 'Front end developer', viewValue: 'Front end developer' },
        { value: 'Back end developer', viewValue: 'Back end developer' },
        { value: 'Full stack developer', viewValue: 'Full stack developer' },
        { value: 'IT support', viewValue: 'IT support' },
        { value: 'Data Analyst', viewValue: 'Data Analyst' }
      ]
    },
    {
      name: 'Sales',
      role: [
        { value: 'Sales assistant', viewValue: 'Sales assistant' }
      ]
    },
    {
      name: 'Accounting',
      role: [
        { value: 'Accountants', viewValue: 'Accountants' }
      ]
    },
    {
      name: 'PA',
      role: [
        { value: 'Personal assistant', viewValue: 'Personal assistant' }
      ]
    },
    {
      name: 'Data',
      role: [
        { value: 'Data entry', viewValue: 'Data entry' }
      ]
    },
    {
      name: 'Admin',
      role: [
        { value: 'Admin', viewValue: 'Admin' }
      ]
    },
    {
      name: 'Human Resources',
      role: [
        { value: 'Human Resources Manager', viewValue: 'Human Resources Manager' }
      ]
    }
  ];

  public employment_types: EmpymentType[] = [
    { value: 'Full time', viewValue: 'Full time' },
    { value: 'Part time', viewValue: 'Part time' },
    { value: 'Casual', viewValue: 'Casual' },
    { value: 'Contract', viewValue: 'Contract' }
  ];

  public experience: Experience = {
    title: '',
    employment_type: '',
    company: '',
    location: {
      country: '',
      city: '',
    },
    currently_working: '',
    start_date: '',
    end_date: '',
    description: '',
    media: '',
  }

  public education: Education = {
    academic_level: '',
    school: '',
    degree: '',
    field_of_study: '',
    start_date: '',
    end_date: '',
    grade: '',
    activities: '',
    description: '',
    media: '',
  }

  public candidate_basic_details: boolean = false;
  public candidate_professional_summary: boolean = false;
  public candidate_education: boolean = false;
  public profile_completion = 0

  constructor(
    private router: Router,
    private candidateService: CandidateService,
    private dialogRef: MatDialogRef<NewCandidateComponent>,
    private countryService: CountryService,
    private notifierService: NotifierService,
  ) { }

  ngOnInit(): void {
    this.initConfirm();
    this.initCandidate();
    this.getCountries();
    this.getCandidatesEmail();
  }

  initConfirm(): void {
    this.confirm = {
      confirm_password: '',
    }
  }

  initCandidate() {
    this.candidate = {
      _id: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      headline: '',
      profile_image: '',
      available: false,
      job_title: '',
      experience: [],
      tools: [],
      projects: [],
      education: [],
      featured: [],
      date_of_birth: '',
      summary: '',
      skills: [],
      country: '',
      country_code: '',
      city: '',
      industry_category: '',
      email: '',
      phone: '',
      access_level: '',
      password: '',
      account_type: 'candidate',
      interview: [],
      original_candidate_record: {},
      modified_candidate_records: [],
      created_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
      profile_completion: 0,
      audio_id: '',
      documents: [],
      dob: new Date(Date.now()).getTime() / 1000,
      candidate_type: '',
      technical_skills: [],
      staff: false,
      employment_status: '',
      job_role: {
        job_name: '',
        id: ''
      },
    }
  }

  getCountries() {
    this.countryService.getAllCountries().subscribe(returned_countries => {
      this.countries = returned_countries
    })
  }

  getCountryCode(event: any) {
    // console.log(event)
    if (event.value) {
      this.countries.filter((x: any) => {
        if (x.country_name === event.value) {
          this.candidate.country_code = x.country_code;
        }
      })
    }
  }

  // get candidate emails
  getCandidatesEmail() {
    this.candidateService.getAllCandidates().subscribe(data => {
      data.forEach(x => {
        this.candidate_emails.push(x.email);
      });
    })
  }

  Education() {
    if (this.candidate_emails.includes(this.candidate.email)) {
      this.email_exists = true;
    } else {
      this.email_exists = false;
      this.education_view = true;
      this.new_candidate = false;
    }
  }

  PreviousToEducation() {
    this.education_view = true;
    this.experience_view = false;
  }

  PreviousToBasicDetails() {
    this.education_view = false;
    this.new_candidate = true;
  }

  NextToExperience() {
    this.experience_view = true;
    this.education_view = false;
  }

  PreviousToExperience() {
    this.experience_view = true;
    this.availability_view = false;
  }

  NextToStudent() {
    this.employment_view = false;
    this.location_view = false;
    this.student_view = true;
  }

  NextToAvailability() {
    this.experience_view = false;
    this.availability_view = true;
  }

  checkEmailExist() {
    /**Check if email exists */
  }

  onChangeStartDate(event: any) {
    this.experience.start_date = event.value;
  }

  onChangeEndDate(event: any) {
    this.experience.end_date = event.value;
  }

  CurrentWorkStatus(event: any) {
    this.experience.currently_working = event.checked;
  }

  CurrentAvailabilityStatus(event: any) {
    this.candidate.available = event.checked;
  }

  Save() {
    if (this.experience.title !== "") {
      this.candidate.experience.push(this.experience) // push this when saving to the database
    }

    if (this.education.school !== "") {
      this.candidate.education.push(this.education) // push this when saving to the database
    }

    // checking registration completion , add 20% if section is available
    this.profile_completion = 0

    if (this.candidate.first_name !== '') {
      this.candidate_basic_details = true;
      this.profile_completion += 20;
    }

    if (this.candidate.summary !== '') {
      this.candidate_professional_summary = true;
      this.profile_completion += 20;
    }

    if (this.candidate.education.length > 0) {
      this.candidate_education = true;
      this.profile_completion += 20;
    }

    this.candidate.profile_completion = this.profile_completion;

    this.candidateService.addCandidate(this.candidate).subscribe(returned => {
      if (returned) {
        this.router.navigate(['/candidates']);
        this.dialogRef.close();
        this.notifierService.Notification("success", "candidate successfully added.");
      } else {
        this.notifierService.Notification("warning", "failed to save candidate.");
      }
    })
  }

  /**Display Errors */

  getEmailErrorMessage() {
    return 'Email is required';
  }

  getFirstnameMessage() {
    return 'Firstname is required';
  }

  getLastnameMessage() {
    return 'Lastname is required';
  }

  getCountryMessage() {
    return 'Country is required';
  }

  getCityMessage() {
    return 'City is required';
  }

  getAddressMessage() {
    return 'Physical Address is required';
  }

  getTitleMessage() {
    return 'Job title is required';
  }

  getCompanyMessage() {
    return 'Company is required';
  }

  getExperienceLocationCountryMessage() {
    return 'Country is required';
  }

  getExperienceLocationCityMessage() {
    return 'City is required';
  }

  getStartDateMessage() {
    return 'Start Date is required';
  }

  getShcoolMessage() {
    return 'School Name is required';
  }

  getPhoneMessage() {
    return 'Phone Number is required';
  }

  getSummaryMessage() {
    return 'Professional Summary is required';
  }

  close() {
    this.dialogRef.close();
  }

}
