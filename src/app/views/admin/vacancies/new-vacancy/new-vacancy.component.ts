import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Vacancy } from 'src/app/models/vacancy';
import { ClientService } from 'src/app/services/client.service';
import { CountryService } from 'src/app/services/country.service';
import { IndustryService } from 'src/app/services/industry.service';
import { JobService } from 'src/app/services/job.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { VacancyService } from 'src/app/services/vacancy.service';
import Quill from "quill";
import BlotFormatter from "quill-blot-formatter";

Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-new-vacancy',
  templateUrl: './new-vacancy.component.html',
  styleUrls: ['./new-vacancy.component.scss']
})
export class NewVacancyComponent implements OnInit {

  public vacancy!: Vacancy;
  public vacancy_categories!: any;
  public job_titles!: any;
  public countries: any;
  public country_empty = false;

  // @ViewChild('editor') editor;
  @ViewChild("editor", { static: true }) editor: ElementRef | any;
  htmlString: string = '';
  quillEditorRef: any;
  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      [{ 'header': 1 }, { 'header': 2 }], // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
      [{ 'direction': 'rtl' }], // text direction
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'align': [] }],
      ['clean'], // remove formatting button
      ['link'], // link and image, video
    ],
    blotFormatter: {
      // empty object for default behaviour.
    }
  };

  onContentChanged = (event: any) => {
    this.htmlString = event.html;
  }


  constructor(
    // @Inject(MAT_DIALOG_DATA) public clientdatainfo: any,
    private vacancyService: VacancyService,
    private dialogRef: MatDialogRef<NewVacancyComponent>,
    private industry: IndustryService,
    private job_title: JobService,
    private notifier: NotifierService,
    private countryService: CountryService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.initPoject();

    // fetch vacancy categories
    this.getCategories();

    // fetch job titles
    this.getJobTitles();

    this.getCountries();
  }

  initPoject() {
    this.vacancy = {
      _id: '',
      name: '',
      category: '',
      created_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
      modified_date: new Date(Date.now()).getTime() / 1000,
      expiry_date: {},
      salary_range: {
        from: 0,
        to: 0
      },
      summary: '',
      responsibilities: '',
      skills: '',
      qualifications: '',
      vacancy_type: '',
      city: '',
      country: '',
      apply_process: '',
      interested_candidates: [],
      intraining_candidates: [],
      shortlisted_candidates: [],
      rejected_candidates: [],
      under_review_candidates: [],
      accepted_candidates_after_interview: [],
      rejected_candidates_after_interview: [],
      under_review_candidates_after_interview: [],
    }
  }

  addVacancy(vacancy: any) {

    if (vacancy.category !== '' && vacancy.name !== '' && vacancy.vacancy_type !== '') {
      // vacancy.expiry_date = this.vacancy.expiry_date.getTime() / 1000;

      this.vacancyService.addVacancy(vacancy).subscribe(created => {
        if (created) {
          this.notifier.Notification("success", "new vacancy successfully saved.");
          this.close();
        } else {
          this.notifier.Notification("warning", "failed to save.");
        }
      })
    } else {
      this.notifier.Notification("warning", "fill all required fields.");
    }
  }

  createNotification(job_name: any) {
    const notification: any = {
      name: 'Job Post',
      message: 'New job post in' + ' ' + job_name,
      candidate_id: '',
      timestamp: new Date(Date.now()).getTime() / 1000
    }
    this.notificationService.addNotification(notification).subscribe(created_notofication => {
      console.log('ssssssss')
    })
  }

  //get clients
  getCategories() {
    this.industry.getAllIndustries().subscribe((returned_intusties: any) => {
      this.vacancy_categories = returned_intusties;
    })
  }

  getJobTitles() {
    this.job_title.getAllJobs().subscribe((returned_job_title: any) => {
      this.job_titles = returned_job_title;
    })
  }

  getCountries() {
    this.countryService.getAllCountries().subscribe(returned_countries => {
      this.countries = returned_countries
    })
  }


  onChangeExpiryDate(event: any) {
    this.vacancy.expiry_date = event.value;
  }

  close() {
    this.dialogRef.close();
  }


  //required attributes
  getVacancyNameMessage() {
    return 'Vacancy name is required';
  }

  getClientNameMessage() {
    return 'Client name is required';
  }

  getIndustryNameMessage() {
    return 'Industry name is required';
  }

  getRequirementsMessage() {
    return 'Requirements are required';
  }

  getStatusMessage() {
    return 'Status is required';
  }

  getStartDateMessage() {
    return 'Start date is required';
  }

  getEndDateMessage() {
    return 'End date is required';
  }

  getCountryMessage() {
    return 'Country is required';
  }

}

