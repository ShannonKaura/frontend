import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Candidate, CandidateConfirm } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { DataService } from 'src/app/services/data.service';
import { EmailService } from 'src/app/services/email.service';
import { NotifierService } from 'src/app/services/notifier.service';


@Component({
  selector: 'app-candidate-signup',
  templateUrl: './candidate-signup.component.html',
  styleUrls: ['./candidate-signup.component.scss']
})
export class CandidateSignupComponent implements OnInit {

  public hide = true;
  public candidate_form = true;
  public email_password_view = true;
  public candidate!: Candidate;
  public confirm!: CandidateConfirm;
  public email_exists: boolean = false;
  public countries: any;
  public candidate_emails = new Set();
  public checked = false;

  public page!: string;
  public subscription!: Subscription;

  public created_candidate: any;
  public profile_completion: number = 0;
  public RegisteredCandidates: any;
  public disabled: boolean = false;

  constructor(
    private router: Router,
    private candidateService: CandidateService,
    private notifierService: NotifierService,
    private emailService: EmailService,
    private data: DataService
  ) {
  }

  ngOnInit(): void {
    this.initConfirm();
    this.initCandidate();
    this.getCandidatesEmail();

    this.subscription = this.data.currentPage.subscribe(page => this.page = page);
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
      dob: '',
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

  // get candidate emails
  getCandidatesEmail() {
    this.candidateService.getAllCandidates().subscribe(data => {
      data.forEach((x: any) => {
        this.candidate_emails.add(x.email);
      });
    })

  }

  AgreeAndJoin() {
    this.disabled = true;
    if (!this.email_exists && this.candidate.email && this.candidate.password && this.confirm.confirm_password) {
      this.candidateService.addCandidate(this.candidate).subscribe(() => {
        this.router.navigate(['/login']);
        // this.WelcomeEmail(this.candidate.email);
        this.notifierService.Notification("success", "sign up was successfull, login to continue");
        this.disabled = false;
      })
    } else {
      this.notifierService.Notification("warning", "Input correct details to register.");
      this.disabled = false;
    }
  }

  checkEmailExist() {
    /**Check if email exists */
    if (this.candidate_emails.has(this.candidate.email) && this.candidate.email !== '') {
      this.email_exists = true;
    } else {
      this.email_exists = false;
    }
  }

  // send welcome email
  WelcomeEmail(email: any) {
    this.emailService.SendCandidateWelcomeEmail(email).then((result: any) => {
      this.notifierService.Notification("success", "Welcome Email has been sent to you")
    })
  }

  AgreeCheck(event: any) {
    if (event.checked === true && this.candidate.password) {
      this.checked = event.checked;

    } else {
      this.checked = event.checked;
    }
  }

  /**Display Errors */

  getEmailErrorMessage() {
    return 'Email is required';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

