
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { CountryService } from 'src/app/services/country.service';
import { IndustryService } from 'src/app/services/industry.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { ProjectService } from 'src/app/services/project.service';

Quill.register('modules/blotFormatter', BlotFormatter);

interface BusinessEntity {
  value: string;
  viewValue: string;
}

interface VacancyCategories {
  value: string;
  viewValue: string;
  checked: boolean
}

interface Qualifications {
  value: string;
  viewValue: string;
  checked: boolean
}

interface JobTypes {
  value: string;
  viewValue: string;
  checked: boolean
}

interface Experience {
  value: string;
  viewValue: string;
  checked: boolean
}

interface AgePreferences {
  value: string;
  viewValue: string;
  checked: boolean
}

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  public userForm!: FormGroup;

  public vacancyCategory: VacancyCategories[] = [
    { value: 'Marketing', viewValue: 'Marketing', checked: false },
    { value: 'Sales', viewValue: 'Sales', checked: false },
    { value: 'IT, Web & Software Development', viewValue: 'IT, Web & Software Development', checked: false },
    { value: 'Administration', viewValue: 'Administration', checked: false },
    { value: 'Accounting', viewValue: 'Accounting', checked: false },
    { value: 'Graphic Design', viewValue: 'Graphic Design', checked: false }
  ];

  public vacancyCategoriesList: any = [];
  public other_category = "";

  public IsChecked = false;
  public vacancy_details: any = [];
  public addJobDetails: boolean = false
  public showButton: boolean = true;

  checkVacancyCategory(event: any, value: any) {

    if (event == true) {
      this.vacancyCategoriesList.push({ vacancy_name: value });
    } else {
      this.vacancyCategoriesList = this.vacancyCategoriesList.filter((vacancyCategory: any) => vacancyCategory.vacancy_name !== value);
    }

  }


  public qualifications: Qualifications[] = [
    { value: 'Diploma', viewValue: 'Diploma', checked: false },
    { value: 'Degree', viewValue: 'Degree', checked: false },
    { value: 'Not specific', viewValue: 'Not specific', checked: false }
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
    { value: 'Full-time', viewValue: 'Full-time', checked: false },
    { value: 'Part-time', viewValue: 'Part-time', checked: false },
    { value: 'Contract', viewValue: 'Contract', checked: false }
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
    { value: 'Less than 1 year', viewValue: 'Less than 1 year', checked: false },
    { value: '1-2 years', viewValue: '1-2 years', checked: false },
    { value: '3-5 years', viewValue: '3-5 years', checked: false },
    { value: 'More than 5 yeares', viewValue: 'More than 5 yeares', checked: false },
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
    { value: '18-22', viewValue: '18-22', checked: false },
    { value: '23-29', viewValue: '23-29', checked: false },
    { value: '30-40', viewValue: '30-40', checked: false },
    { value: '40 and above', viewValue: '40 and above', checked: false },
    { value: 'No age preference', viewValue: 'No age preference', checked: false }
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


  constructor(
    private clientService: ClientService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private countryService: CountryService,
    private industryService: IndustryService,
    private notifier: NotifierService,
    private _fb: FormBuilder
  ) {
    this.userForm = this._fb.group({
      vacancyDetail: this._fb.array([this.addVacancyDetailsGroup()])
    });
  }

  ngOnInit(): void {
    this.initClient();
    this.getClient();
  }

  // initialize client model
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
      created_date: new Date(Date.now()).getTime() / 1000,
    }
  }

  // get client by Id
  getClient() {
    const clientId = this.route.snapshot.paramMap.get('id');
    if (clientId) {
      this.clientService.getClientById(clientId).subscribe((returnedclient: any) => {
        this.client = returnedclient;

        this.vacancy_details = this.client.recruitment_details.vacancy_details;

        // vacancy categories
        this.client.recruitment_details.vacancy_categories.forEach((returned: any) => {
          // console.log(returned.vacancy_name)
          this.vacancyCategory.filter(cat => {

            if (cat.value == returned.vacancy_name) {
              cat.checked = true;
            }

          })
        })

        this.other_category = this.client.recruitment_details.vacancy_categories[this.client.recruitment_details.vacancy_categories.length - 1]['name'];


        // vacancy qualifications
        this.client.recruitment_details.qualifications.forEach((returned: any) => {
          // console.log(returned.vacancy_name)
          this.qualifications.filter(qual => {

            if (qual.value == returned.qualification) {
              qual.checked = true;
            }

          })
        })

        this.other_qualification = this.client.recruitment_details.qualifications[this.client.recruitment_details.qualifications.length - 1]['name'];


        // vacancy job types
        this.client.recruitment_details.job_types.forEach((returned: any) => {
          // console.log(returned.vacancy_name)
          this.jobTypes.filter(job => {

            if (job.value == returned.job_type) {
              job.checked = true;
            }

          })
        })

        this.other_job_type = this.client.recruitment_details.job_types[this.client.recruitment_details.job_types.length - 1]['name'];


        // vacancy experience
        this.client.recruitment_details.experience.forEach((returned: any) => {
          // console.log(returned.vacancy_name)
          this.experience.filter(exp => {

            if (exp.value == returned.experience) {
              exp.checked = true;
            }

          })
        })

        this.other_experience = this.client.recruitment_details.experience[this.client.recruitment_details.experience.length - 1]['name'];


        // vacancy ege preference
        this.client.recruitment_details.age_preference.forEach((returned: any) => {
          // console.log(returned.vacancy_name)
          this.agePreferences.filter(age => {

            if (age.value == returned.age_preference) {
              age.checked = true;
            }

          })
        })
      })
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

  //update client
  updateClient(client: Client) {
    this.clientService.updateClient(client).subscribe(updatedClient => {
      this.client = updatedClient;
      if (this.client) {
        this.notifier.Notification("success", "client successfully updated.");
      } else {
        this.notifier.Notification("warning", "failed to update.");
      }
    })
  }

  addMoreJobDetails() {
    this.addJobDetails = true;
    this.showButton = false;
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
