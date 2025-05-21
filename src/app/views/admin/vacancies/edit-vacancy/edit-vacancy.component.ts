import { SelectionModel } from '@angular/cdk/collections';
import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Candidate } from 'src/app/models/candidate';
import { Vacancy } from 'src/app/models/vacancy';
import { CandidateNoProfileService } from 'src/app/services/candidate-no-profile.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { CountryService } from 'src/app/services/country.service';
import { DataService } from 'src/app/services/data.service';
import { IndustryService } from 'src/app/services/industry.service';
import { JobService } from 'src/app/services/job.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { VacancyService } from 'src/app/services/vacancy.service';
import { ViewAppliedCandidateComponent } from '../../candidates/view-applied-candidate/view-applied-candidate.component';

import Quill from "quill";
import BlotFormatter from "quill-blot-formatter";

Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-edit-vacancy',
  templateUrl: './edit-vacancy.component.html',
  styleUrls: ['./edit-vacancy.component.scss']
})
export class EditVacancyComponent implements OnInit {

  public vacancy!: any;
  public subscriptionVacancy!: Subscription;

  public vacancy_categories!: any;
  public job_titles!: any;
  public applied_candidates: any = [];
  public shortlisted_candidates: any = [];
  public DisplayedColumns: string[] = ['candidate_name', 'applied_date', 'action'];
  public appliedCandidateDataSource!: MatTableDataSource<Candidate>;
  public shortlistedCandidateDataSource!: MatTableDataSource<Candidate>;
  public rejectedCandidateDataSource!: MatTableDataSource<Candidate>;
  public underReviewCandidateDataSource!: MatTableDataSource<Candidate>;
  public acceptedCandidateDataSource!: MatTableDataSource<Candidate>;
  public under_reviewCandidateAfterInterviewDataSource!: MatTableDataSource<Candidate>;
  public rejectedCandidateAfterInterviewDataSource!: MatTableDataSource<Candidate>;
  public selection = new SelectionModel<Candidate>(true, []);

  @ViewChild('applied_candidate_paginator', { static: false }) applied_candidate_paginator!: MatPaginator;
  @ViewChild('shortlisted_candidate_paginator', { static: false }) shortlisted_candidate_paginator!: MatPaginator;
  @ViewChild('rejected_candidate_paginator', { static: false }) rejected_candidate_paginator!: MatPaginator;
  @ViewChild('under_review_candidates', { static: false }) under_review_candidates!: MatPaginator;
  @ViewChild('under_review_candidate_paginator', { static: false }) under_review_candidate_paginator!: MatPaginator;
  @ViewChild('interested_accepted_paginator', { static: false }) interested_accepted_paginator!: MatPaginator;
  @ViewChild('accepted_candidate_paginator', { static: false }) accepted_candidate_paginator!: MatPaginator;
  @ViewChild('interested_candidate_paginator', { static: false }) interested_candidate_paginator!: MatPaginator;
  @ViewChild('interested_shortlisted_paginator', { static: false }) interested_shortlisted_paginator!: MatPaginator;
  @ViewChild('interested_under_review_paginator', { static: false }) interested_under_review_paginator!: MatPaginator;
  @ViewChild('rejected_candidate_after_interview_paginator', { static: false }) rejected_candidate_after_interview_paginator!: MatPaginator;
  @ViewChild('under_review_candidate_after_interview_paginator', { static: false }) under_review_candidate_after_interview_paginator!: MatPaginator;


  public pageSizeOptions: number[] = [];
  public pageEvent!: PageEvent;
  public pageSize = 5;
  public applied_candidates_empty = true;
  public shortlisted_candidates_empty = true;
  public rejected_candidates_empty = true;
  public under_review_candidates_empty = true;
  public accepted_candidates_empty = true;
  public under_review_candidates_after_interview_empty = true;
  public AppliedCandidateData: any = [];
  public rejected_candidates: any = [];
  public under_review: any = [];
  public view_interested_candidates: boolean = true;
  public view_shortlisted_candidates: boolean = false;
  public view_rejected_candidates: boolean = false;
  public view_under_review_candidates: boolean = false;
  public view_accepted_candidates: boolean = false;
  public sendTo: any = [];
  public country_empty = false;
  public countries: any;
  public view_rejected_after_interview_candidates: boolean = false;
  public view_under_review_after_interview_candidates: boolean = false;
  public searchText!: any;
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({}),
  };
  public email_baseurl!: string;
  public email_api_key!: string;
  public interested_rejected_paginator: boolean = false;
  public candidate_application_date: any = [];
  public candidate_shortlisted_date: any = [];
  public candidate_rejected_date: any = [];
  public candidate_under_review_date: any = [];
  public candidate_accepted_date: any = [];
  public candidate_under_review_after_interview_date: any = [];
  public show_accepted_candidates: any = [];
  public rejected_after_interview: any = [];
  public show_intraining_candidates: any = [];
  public under_review_after_interview: any = [];
  public candidate_rejected_after_interview_date: any = [];
  public rejected_candidates_after_interview_empty: boolean = false;
  public before_interview: boolean = true;
  public after_interview_candidates: boolean = false;
  public before_interview_candidates: boolean = true;
  public interested_candidates: any = [];
  public intraining_candidates: any = [];
  public view_intraining_candidates: boolean = false;

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
    private candidateService: CandidateService,
    private candidateNoProfileService: CandidateNoProfileService,
    private industry: IndustryService,
    private job_title: JobService,
    private notifier: NotifierService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private countryService: CountryService,
    private data: DataService
  ) { }

  ngOnInit(): void {
    this.subscriptionVacancy = this.data.currentVacancy.subscribe((vacancy: any) => {
      this.vacancy = vacancy;

      // before interview
      this.interested_candidates = vacancy.interested_candidates;
      this.shortlisted_candidates = vacancy.shortlisted_candidates;
      this.under_review_candidates = vacancy.under_review_candidates;

      // after interview
      this.show_accepted_candidates = vacancy.accepted_candidates_after_interview;
      this.show_intraining_candidates = vacancy.intraining_candidates;
      this.rejected_after_interview = vacancy.rejected_candidates_after_interview;
      this.under_review_after_interview = vacancy.under_review_candidates_after_interview;
    });

    this.initPoject();

    // fetch vacancy categories
    this.getCategories();

    // fetch job titles
    this.getJobTitles();

    this.getVacancy();

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

  // get client by Id
  getVacancy() {
    const vacancyId = this.route.snapshot.paramMap.get('id');

    this.interested_candidates = [];
    this.shortlisted_candidates = [];
    this.rejected_candidates = [];
    this.under_review = [];
    this.show_accepted_candidates = [];
    this.show_intraining_candidates = []
    this.rejected_after_interview = [];
    this.under_review_after_interview = [];

    if (vacancyId) {
      this.vacancyService.getVacancyById(vacancyId).subscribe((returnedvacancy: Vacancy) => {
        this.vacancy = returnedvacancy;

        // Creating unique values from lists

        // console.log('vacancies', this.vacancy.interested_candidates);

        // const uniqueIds: any = [];
        // const uniqueNames: any = [];

        // this.vacancy.interested_candidates = this.vacancy.interested_candidates.filter((element: any) => {
        //   const duplicate = uniqueIds.includes(element._id);
        //   const duplicate2 = uniqueNames.includes(element.name);

        //   if (!duplicate) {
        //     uniqueIds.push(element._id);
        //     return true;
        //   }

        //   if (!duplicate2) {
        //     uniqueNames.push(element.name);
        //     return true;
        //   }

        //   return false;
        // });

        // console.log('unique values', this.vacancy);

        // this.vacancyService.updateVacancy(this.vacancy).subscribe(returned => {
        //   console.log('returned values')
        // })

        this.interested_candidates = this.vacancy.interested_candidates;
        this.shortlisted_candidates = this.vacancy.shortlisted_candidates;
        this.rejected_candidates = this.vacancy.rejected_candidates;
        this.under_review = this.vacancy.under_review_candidates;
        this.show_accepted_candidates = this.vacancy.accepted_candidates_after_interview;
        this.show_intraining_candidates = this.vacancy.intraining_candidates;
        this.rejected_after_interview = this.vacancy.rejected_candidates_after_interview;
        this.under_review_after_interview = this.vacancy.under_review_candidates_after_interview;
      })
    }
  }

  public applyInterestedCandidatesFilter(filterValue: any) {
    this.interested_candidates.filter = filterValue.target.value.trim().toLowerCase();
  }

  getCountries() {
    this.countryService.getAllCountries().subscribe(returned_countries => {
      this.countries = returned_countries
    })
  }



  ViewInterestedCandidates() {

    this.getVacancy();

    this.view_accepted_candidates = false;
    this.view_shortlisted_candidates = false;
    this.view_rejected_candidates = false;
    this.view_under_review_candidates = false;
    this.view_rejected_after_interview_candidates = false;
    this.view_under_review_after_interview_candidates = false;
    this.interested_rejected_paginator = false;

    this.view_interested_candidates = true;
  }

  ViewShortlistedCandidates() {

    this.getVacancy();

    this.view_accepted_candidates = false;
    this.view_shortlisted_candidates = true;
    this.view_interested_candidates = false;
    this.view_rejected_candidates = false;
    this.view_under_review_candidates = false;
    this.view_rejected_after_interview_candidates = false;
    this.view_under_review_after_interview_candidates = false;


    this.interested_rejected_paginator = false;
  }

  ViewRejectedCandidates() {

    this.getVacancy();

    this.view_accepted_candidates = false;
    this.view_rejected_candidates = true;
    this.view_shortlisted_candidates = false;
    this.view_interested_candidates = false;
    this.view_under_review_candidates = false;
    this.view_rejected_after_interview_candidates = false;
    this.view_under_review_after_interview_candidates = false;

    this.interested_rejected_paginator = true;
  }

  ViewUnderReviewCandidates() {

    this.getVacancy();

    this.view_accepted_candidates = false;
    this.view_under_review_candidates = true;
    this.view_rejected_candidates = false;
    this.view_shortlisted_candidates = false;
    this.view_interested_candidates = false;
    this.view_rejected_after_interview_candidates = false;
    this.view_under_review_after_interview_candidates = false;
    this.view_under_review_after_interview_candidates = false;

    this.interested_rejected_paginator = false;
  }

  ViewAcceptedCandidates() {
    this.getVacancy();

    this.view_under_review_candidates = false;
    this.view_rejected_candidates = false;
    this.view_shortlisted_candidates = false;
    this.view_interested_candidates = false;
    this.view_rejected_after_interview_candidates = false;
    this.view_under_review_after_interview_candidates = false;
    this.view_under_review_after_interview_candidates = false;

    this.interested_rejected_paginator = false;

    this.view_accepted_candidates = true;

  }

  ViewInTrainingCandidates() {
    this.view_under_review_candidates = false;
    this.view_rejected_candidates = false;
    this.view_shortlisted_candidates = false;
    this.view_interested_candidates = false;
    this.view_rejected_after_interview_candidates = false;
    this.view_under_review_after_interview_candidates = false;
    this.view_under_review_after_interview_candidates = false;
    this.interested_rejected_paginator = false;
    this.view_accepted_candidates = false;

    this.view_intraining_candidates = true;
  }

  ViewRejectedAfterInterviewCandidates() {
    this.getVacancy();

    this.view_under_review_candidates = false;
    this.view_rejected_candidates = false;
    this.view_shortlisted_candidates = false;
    this.view_interested_candidates = false;

    this.interested_rejected_paginator = false;
    this.view_under_review_after_interview_candidates = false;
    this.view_under_review_after_interview_candidates = false;

    this.view_accepted_candidates = false;

    this.view_rejected_after_interview_candidates = true;


  }

  ViewUnderReviewAfterInterviewCandidates() {
    this.getVacancy();

    this.view_under_review_candidates = false;
    this.view_rejected_candidates = false;
    this.view_shortlisted_candidates = false;
    this.view_interested_candidates = false;

    this.interested_rejected_paginator = false;

    this.view_accepted_candidates = false;

    this.view_rejected_after_interview_candidates = false;
    this.view_under_review_after_interview_candidates = true;

  }

  onClickBeforeInterview() {
    this.view_accepted_candidates = false;
    this.view_interested_candidates = true;
    this.view_shortlisted_candidates = false;
    this.view_rejected_candidates = false;
    this.view_under_review_candidates = false;
    this.view_rejected_after_interview_candidates = false;
    this.view_under_review_after_interview_candidates = false;


    this.interested_rejected_paginator = false;
    this.before_interview = true;
    this.after_interview_candidates = false;
    this.before_interview_candidates = true;

    this.getVacancy();
  }

  onClickAfterInterview() {
    this.view_under_review_candidates = false;
    this.view_rejected_candidates = false;
    this.view_shortlisted_candidates = false;
    this.view_interested_candidates = false;
    this.view_rejected_after_interview_candidates = false;
    this.view_under_review_after_interview_candidates = false;

    this.interested_rejected_paginator = false;

    this.before_interview = false;
    this.before_interview_candidates = false;
    this.view_accepted_candidates = true;

    this.after_interview_candidates = true;
  }

  //view client
  openViewCandidate(selected: any) {
    // first get candidate date
    this.candidateService.getCandidateById(selected._id).subscribe(returned_candidate => {
      const dialogRef = this.dialog.open(ViewAppliedCandidateComponent, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        autoFocus: false,
        data: { candidate_data: returned_candidate, candidate_brief_data: selected, vacancy: this.vacancy },
      });

      dialogRef.updatePosition({
        top: '4%',
      });


      dialogRef.afterClosed().subscribe(result => {
        this.applied_candidates = [];
        this.shortlisted_candidates = [];
        this.rejected_candidates = [];

        this.applied_candidates = this.vacancy.interested_candidates;
        this.shortlisted_candidates = this.vacancy.shortlisted_candidates;
        this.rejected_candidates = this.vacancy.rejected_candidates;
      });
    })

  }


  //update client
  updateVacancy(vacancy: any) {
    // vacancy.expiry_date = this.vacancy.expiry_date.getTime() / 1000;

    this.vacancyService.updateVacancy(vacancy).subscribe(updatedVacancy => {
      this.vacancy = updatedVacancy;
      if (this.vacancy) {
        this.notifier.Notification("success", "client successfully updated.");
        // this.getVacancy();
      } else {
        this.notifier.Notification("warning", "failed to update.");
      }
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

  onChangeExpiryDate(event: any) {
    // this.vacancy.expiry_date = event.value;
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

  ngOnDestroy() {
    this.subscriptionVacancy.unsubscribe();
  }
}

