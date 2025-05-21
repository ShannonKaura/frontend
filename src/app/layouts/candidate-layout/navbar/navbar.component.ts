import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { DataService } from 'src/app/services/data.service';
import { SharingDataService } from 'src/app/services/sharing-data.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { CandidateUserComponent } from 'src/app/views/candidate/candidate-user/candidate-user.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public applicationInfoSubscription!: Subscription;
  public applicationInfo!: {};

  public loggedIn: boolean = false;
  public subscription!: Subscription;
  public candidate!: Candidate;
  public isLoggedIn = false;

  public user: any;
  public profile_active: boolean = false;
  public jobs_active: boolean = false;
  public show_menu: boolean = false;
  public notifications_active: boolean = false;


  constructor(
    private dialog: MatDialog,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private data: DataService,
    private candidateService: CandidateService,
    private sharedData: SharingDataService,
  ) { }

  ngOnInit(): void {

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

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.getUserById(this.tokenStorageService.getUser().id);
    }

    this.subscription = this.data.currentMessage.subscribe(message => {
      this.loggedIn = message;

      if (this.loggedIn === true) {
        this.isLoggedIn = true;
        this.user = this.tokenStorageService.getUser();
      }
    });

    // subscribe to application status obsavable
    this.applicationInfoSubscription = this.sharedData.currentApplicationInfo.subscribe(data => {
      this.applicationInfo = data;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.applicationInfoSubscription.unsubscribe();
  }

  getUserById(id: any) {
    this.candidateService.getCandidateById(id).subscribe(returned => {
      this.candidate = returned;
    })
  }

  //candidate user dialog
  CandidateUser(): void {
    const dialogRef = this.dialog.open(CandidateUserComponent, {
      width: '300px',
      maxHeight: '620px',
    });

    dialogRef.updatePosition({
      top: '4%',
      right: '15%',
    });
  }

  ViewProfile() {
    this.sharedData.changeApplicationInfo({});
    const url = `/profile/${this.user.id}`;
    this.router.navigate([url]);
    this.profile_active = true;
    this.jobs_active = false;
    this.show_menu = false
  }

  ViewJobs() {
    const url = `/jobs`;
    this.router.navigate([url]);
    this.jobs_active = true;
    this.profile_active = false;
    this.show_menu = false
  }

  ViewNotificatons() {

  }

  Menu() {
    if (this.show_menu == true) {
      this.show_menu = false
    } else {
      this.show_menu = true
    }
  }

  Login() {
    const url = `/login`;
    this.router.navigate([url]);
  }

  SignUp() {
    const url = `/signup`;
    this.router.navigate([url]);
  }

  Home() {
    const url = `/`;
    this.router.navigate([url]);
  }


}
