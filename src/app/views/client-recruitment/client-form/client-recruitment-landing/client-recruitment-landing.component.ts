import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { NotifierService } from 'src/app/services/notifier.service';

Quill.register('modules/blotFormatter', BlotFormatter);

interface BusinessEntity {
  value: string;
  viewValue: string;
}

interface VacancyCategories {
  value: string;
  viewValue: string;
}

interface Qualifications {
  value: string;
  viewValue: string;
}

interface JobTypes {
  value: string;
  viewValue: string;
}

interface Experience {
  value: string;
  viewValue: string;
}

interface AgePreferences {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-client-recruitment-landing',
  templateUrl: './client-recruitment-landing.component.html',
  styleUrls: ['./client-recruitment-landing.component.scss']
})

export class ClientRecruitmentLandingComponent implements OnInit {
  public userForm!: FormGroup;

  public vacancyCategory: VacancyCategories[] = [
    { value: 'Marketing', viewValue: 'Marketing' },
    { value: 'Sales', viewValue: 'Sales' },
    { value: 'IT, Web & Software Development', viewValue: 'IT, Web & Software Development' },
    { value: 'Administration', viewValue: 'Administration' },
    { value: 'Accounting', viewValue: 'Accounting' },
    { value: 'Graphic Design', viewValue: 'Graphic Design' }
  ];

  public vacancyCategoriesList: any = [];
  public other_category = "";

  checkVacancyCategory(event: any, value: any) {

    if (event == true) {
      this.vacancyCategoriesList.push({ vacancy_name: value });
    } else {
      this.vacancyCategoriesList = this.vacancyCategoriesList.filter((vacancyCategory: any) => vacancyCategory.vacancy_name !== value);
    }

  }


  public qualifications: Qualifications[] = [
    { value: 'Diploma', viewValue: 'Diploma' },
    { value: 'Degree', viewValue: 'Degree' },
    { value: 'Not specific', viewValue: 'Not specific' }
  ];

  public qualificationsList: any = [];
  public other_qualification = "";

  checkQualification(event: any, value: any) {

    if (event == true) {
      this.qualificationsList.push({ qualification: value });
    } else {
      this.qualificationsList = this.qualificationsList.filter((qualifications: any) => qualifications.qualification !== value);
    }
  }


  public jobTypes: JobTypes[] = [
    { value: 'Full-time', viewValue: 'Full-time' },
    { value: 'Part-time', viewValue: 'Part-time' },
    { value: 'Contract', viewValue: 'Contract' }
  ];

  public jobTypesList: any = [];
  public other_job_type = "";
  public form_submitted = false;

  checkJobTypes(event: any, value: any) {

    if (event == true) {
      this.jobTypesList.push({ job_type: value });
    } else {
      this.jobTypesList = this.jobTypesList.filter((jobType: any) => jobType.job_types !== value);
    }
  }


  public experience: Experience[] = [
    { value: 'Less than 1 year', viewValue: 'Less than 1 year' },
    { value: '1-2 years', viewValue: '1-2 years' },
    { value: '3-5 years', viewValue: '3-5 years' },
    { value: 'More than 5 yeares', viewValue: 'More than 5 yeares' },
  ];

  public experienceList: any = [];
  public other_experience = "";

  checkExperience(event: any, value: any) {

    if (event == true) {
      this.experienceList.push({ experience: value });
    } else {
      this.experienceList = this.experienceList.filter((exp: any) => exp.experience !== value);
    }
  }


  public agePreferences: AgePreferences[] = [
    { value: '18-22', viewValue: '18-22' },
    { value: '23-29', viewValue: '23-29' },
    { value: '30-40', viewValue: '30-40' },
    { value: '40 and above', viewValue: '40 and above' },
    { value: 'No age preference', viewValue: 'No age preference' }
  ];

  public agePreferencesList: any = [];

  checkAgePreferences(event: any, value: any) {

    if (event == true) {
      this.agePreferencesList.push({ age_preference: value });
    } else {
      this.agePreferencesList = this.agePreferencesList.filter((agePreference: any) => agePreference.age_preferences !== value);
    }
  }

  public client!: Client;

  public businessEntities: BusinessEntity[] = [
    { value: 'Sole trader', viewValue: 'Sole trader' },
    { value: 'Partnership', viewValue: 'Partnership' },
    { value: 'Limited liability partnership', viewValue: 'Limited liability partnership' },
    { value: 'Limited company', viewValue: 'Limited company' },
  ];


  @ViewChild("editor", { static: true }) editor: ElementRef | any;
  quillEditorRef: any;
  modules = {
    toolbar: [
      ['bold', 'italic', 'underline'], // toggled buttons
      [{ 'header': 1 }, { 'header': 2 }], // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
      [{ 'direction': 'rtl' }], // text direction
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'align': [] }],
    ],
    blotFormatter: {
      // empty object for default behaviour.
    }
  };


  vacancyCategories = new FormControl('');

  vacancyCategoryList: string[] = ['Marketing', 'Sales', 'IT and Web development', 'Administration', 'Accounting', 'Graphic design', 'Other'];


  constructor(
    private router: Router,
    private clientService: ClientService,
    private notifierService: NotifierService,
    private _fb: FormBuilder
  ) {
    this.userForm = this._fb.group({
      vacancyDetail: this._fb.array([this.addVacancyDetailsGroup()])
    });
  }

  ngOnInit(): void {
    this.initClient();
  }

  initClient() {
    this.client = {
      _id: '',
      company_name: '',
      name: '',
      email_address: '',
      phone_number: '',
      contact_physical_address: '',
      business_overview: '',
      industry_category: '',
      business_entity: '',
      website: '',
      country: '',
      recruitment_details: {
        vacancy_categories: [],
        vacancy_details: [],
        qualifications: [],
        job_types: [],
        experience: [],
        age_preference: [],
        starting_date: null,
      },
      notes: '',
      created_by: '',
      created_date: new Date(Date.now()),
    }
  }

  onChangeExpiryDate(event: any) {
    this.client.recruitment_details.starting_date = event.value;
  }

  //Append Fields Set
  private addVacancyDetailsGroup(): FormGroup {
    return this._fb.group({
      job_title: [],
      candidates_no: [],
      skills: []
    });
  }
  //Add Fields
  addVacancyDetails(): void {
    this.vacancyDetailsArray.push(this.addVacancyDetailsGroup());
  }

  //Remove Fields
  removeAddress(index: number): void {
    this.vacancyDetailsArray.removeAt(index);
  }
  //Fields Array
  get vacancyDetailsArray(): FormArray {
    return <FormArray>this.userForm.get('vacancyDetail');
  }

  saveClient() {
    if (this.other_category != "") {
      this.vacancyCategoriesList.push({ name: this.other_category });
    }

    if (this.other_qualification != "") {
      this.qualificationsList.push({ name: this.other_qualification });
    }

    if (this.other_job_type != "") {
      this.jobTypesList.push({ name: this.other_job_type });
    }

    if (this.other_experience != "") {
      this.experienceList.push({ name: this.other_experience });
    }


    this.client.recruitment_details.vacancy_categories = this.vacancyCategoriesList;
    this.client.recruitment_details.qualifications = this.qualificationsList;
    this.client.recruitment_details.job_types = this.jobTypesList;
    this.client.recruitment_details.experience = this.experienceList;
    this.client.recruitment_details.age_preference = this.agePreferencesList;
    this.client.recruitment_details.vacancy_details = this.userForm.value.vacancyDetail;


    this.clientService.addClient(this.client).subscribe(() => {
      this.form_submitted = true;
    })
  }

  getCompanyNameMessage() {
    return "Add name of your business";
  }

  getContactPersonMessage() {
    return "Add contact person";
  }

  getEmailMessage() {
    return "Add email address";
  }

  getPhoneNumberMessage() {
    return "Add phone number";
  }

  getBusinessOverviewMessage() {
    return "Add an overview of your business";
  }

}
