import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { DataService } from 'src/app/services/data.service';
import { EmailService } from 'src/app/services/email.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { SharingDataService } from 'src/app/services/sharing-data.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { VacancyService } from 'src/app/services/vacancy.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { UpdateAudioPromptComponent } from '../update-audio-prompt/update-audio-prompt.component';
import { UpdateProfilePromptComponent } from '../update-profile-prompt/update-profile-prompt.component';

@Component({
  selector: 'app-view-selected-vacancy',
  templateUrl: './view-selected-vacancy.component.html',
  styleUrls: ['./view-selected-vacancy.component.scss']
})
export class ViewSelectedVacancyComponent implements OnInit, OnDestroy {

  public user: any;
  public isLoggedIn = false;
  public applied = false;
  public audio = false;
  public profile_complete = false;

  public selected_vacancy: any;
  public application_status: string = '';
  public subscription!: Subscription;
  public applicationInfoSubscription!: Subscription;
  public applicationInfo!: {};
  public loggedIn: boolean = false;
  public loading: boolean = false;

  public vacancy_id = {};
  public vacancy_subscription!: Subscription;

  constructor(
    private tokenStorageService: TokenStorageService,
    private vacancyService: VacancyService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private candidateService: CandidateService,
    private notifier: NotifierService,
    private emailService: EmailService,
    private data: DataService,
    private sharedData: SharingDataService,
  ) { }

  ngOnInit(): void {
    this.getVacancyById();
    this.checkIfLoggedIn();

    // subscribe to application status obsavable
    this.applicationInfoSubscription = this.sharedData.currentApplicationInfo.subscribe(data => {
      this.applicationInfo = data;
    })

    // subscribe to the current job vacancy
    this.vacancy_subscription = this.data.currentVacancy.subscribe(vacancy_id => this.vacancy_id = vacancy_id)
  }

  ngOnDestroy() {
    this.applicationInfoSubscription.unsubscribe();
    this.vacancy_subscription.unsubscribe();
  }

  // check if you are eligible to apply
  /**
   * -- Check if logged in
   * 1. Check Basic Details
   * 2. Check Professional Summary
   * 3. Check Contact Details
   * 4. Check Education
   * 5. Check Skills
   * 6. Check Resume
   * 7. Check Audio
   * 
   * 8. Check if Candidate is Interested
   * 9. Check If Candidate is Rejected 
   * 10.Check if CAndidate is Shortlisted
   * 11.Check id Candidate is Under Review
   * 12.Check if Candidate is Accepted after interview
   * 13.Check if Candidate is Rejected after interview
   * 14.Check if Candidate is put Under Review after interview
   * 
   */

  // check if logged in
  checkIfLoggedIn() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
    }

    // check if loggedin from modal
    this.subscription = this.data.currentMessage.subscribe(message => {
      this.loggedIn = message;

      if (this.loggedIn === true) {
        this.isLoggedIn = true;
        this.user = this.tokenStorageService.getUser();
      }
    });
  }

  // check if candidate is interested
  checkCandidateIfInterested(candidate_id: any) {
    return this.selected_vacancy.interested_candidates.some((el: any) => {
      return el._id === candidate_id;
    });
  }

  // check if candidate is rejected
  checkCandidateIfRejected(candidate_id: any) {
    return this.selected_vacancy.rejected_candidates.some((el: any) => {
      return el._id === candidate_id;
    });
  }

  // check if candidate is shortlisted
  checkCandidateIfShortlisted(candidate_id: any) {
    return this.selected_vacancy.shortlisted_candidates.some((el: any) => {
      return el._id === candidate_id;
    });
  }

  // check if candidate is under review
  checkCandidateIfUnderReview(candidate_id: any) {
    return this.selected_vacancy.under_review_candidates.some((el: any) => {
      return el._id === candidate_id;
    });
  }

  // check if candidate is accepted after interview
  checkCandidateIfAcceptedAfterInterview(candidate_id: any) {
    return this.selected_vacancy.accepted_candidates_after_interview.some((el: any) => {
      return el._id === candidate_id;
    });
  }

  // check if candidate is rejected after interview
  checkCandidateIfRejectedAfterInterview(candidate_id: any) {
    return this.selected_vacancy.rejected_candidates_after_interview.some((el: any) => {
      return el._id === candidate_id;
    });
  }

  // check if candidate is put under review after interview
  checkCandidateIfPutUnderReviewAfterInterview(candidate_id: any) {
    return this.selected_vacancy.under_review_candidates_after_interview.some((el: any) => {
      return el._id === candidate_id;
    });
  }

  getVacancyById() {
    this.loading = true;
    const vacancyId = this.route.snapshot.paramMap.get('id');
    if (vacancyId) {
      this.vacancyService.getVacancyById(vacancyId).subscribe(returned_vacancy => {
        this.selected_vacancy = returned_vacancy;

        if (this.isLoggedIn) {
          if (this.checkCandidateIfInterested(this.user.id) || this.checkCandidateIfRejected(this.user.id) || this.checkCandidateIfShortlisted(this.user.id) || this.checkCandidateIfUnderReview(this.user.id) || this.checkCandidateIfAcceptedAfterInterview(this.user.id) || this.checkCandidateIfRejectedAfterInterview(this.user.id) || this.checkCandidateIfPutUnderReviewAfterInterview(this.user.id)) {
            this.applied = true;
          }

          if (this.checkCandidateIfInterested(this.user.id)) {
            this.application_status = 'Application Sent';
          }

          if (this.checkCandidateIfRejected(this.user.id)) {
            this.application_status = 'Application Rejected';
          }

          if (this.checkCandidateIfShortlisted(this.user.id)) {
            this.application_status = 'Application Shortlisted';
          }

          if (this.checkCandidateIfUnderReview(this.user.id)) {
            this.application_status = 'Application under Review';
          }

          if (this.checkCandidateIfAcceptedAfterInterview(this.user.id)) {
            this.application_status = 'Interview Successful';
          }

          if (this.checkCandidateIfRejectedAfterInterview(this.user.id)) {
            this.application_status = 'Interview Unsuccessful';
          }

          if (this.checkCandidateIfPutUnderReviewAfterInterview(this.user.id)) {
            this.application_status = 'Interview Under Review';
          }

          this.loading = false;
        } else {
          this.loading = false;
        }
      })
    }
  }

  // check if profile is complete
  CheckProfileIfComplete(candidate: Candidate) {
    if (candidate.first_name && candidate.last_name && candidate.city && candidate.phone && candidate.country && candidate.dob && candidate.summary && candidate.education.length && candidate.skills.length && candidate.documents.length) {
      return true;
    }
    return false
  }

  Apply() {
    if (this.isLoggedIn) {
      this.candidateService.getCandidateById(this.user.id).subscribe(candidate => {
        if (this.selected_vacancy.category == 'Sales') {
          if (candidate.audio_id && this.CheckProfileIfComplete(candidate)) {
            this.ApplicationProcess(candidate);
          } else {
            this.sharedData.changeApplicationInfo(this.selected_vacancy)
            const url = `/profile/${this.user.id}`;
            this.router.navigate([url]);
          }
        } else {
          if (this.CheckProfileIfComplete(candidate)) {
            this.ApplicationProcess(candidate);
          } else {
            this.sharedData.changeApplicationInfo(this.selected_vacancy)
            const url = `/profile/${this.user.id}`;
            this.router.navigate([url]);
          }
        }
      })

    } else {
      const url = `/create-profile/${this.selected_vacancy.id}`;
      this.router.navigate([url]);
    }
  }

  ApplicationProcess(current_candidate: any) {
    const application_date = new Date(Date.now()).getTime() / 1000;

    this.candidateService.getCandidateById(this.user.id).subscribe((candidate: any) => {
      this.selected_vacancy.interested_candidates.push({ _id: this.user.id, application_date: application_date, first_name: candidate.first_name, middle_name: candidate.middle_name, last_name: candidate.last_name });

      this.vacancyService.updateVacancy(this.selected_vacancy).subscribe(returned => {

        // update candidate interview information

        const interview_info = {
          vacancy_id: this.selected_vacancy.id,
          vacancy_name: this.selected_vacancy.name,
          vacancy_created_date: new Date(Date.now()).getTime() / 1000,
          interview_notes: '',
          interview_score: ''
        }

        candidate.interview.push(interview_info);

        // update candidate
        this.candidateService.updateCandidate(candidate).subscribe(updated => {

          this.notifier.Notification("success", "Application successful");
          this.applied = true;

          this.emailService.SendIntestedCandidateEmail(current_candidate.firstname, current_candidate.middlename, current_candidate.lastname, current_candidate.email, this.selected_vacancy.name).then((result: any) => {
            this.notifier.Notification("success", "Email has been sent to you , check your inbox");
          });
        })
      })
    });

  }

  loginModal(selected_vacancy: any) {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      maxWidth: '100%',
      maxHeight: '100%',
      data: selected_vacancy,
    });

    dialogRef.updatePosition({
      top: '4%',
    });
  }

  completeProfilePromptModal(incomplete_type: any) {
    const dialogRef = this.dialog.open(UpdateProfilePromptComponent, {
      maxWidth: '100%',
      maxHeight: '620px',
      data: incomplete_type,
    });

    dialogRef.updatePosition({
      top: '12%',
    });
  }

  Back() {
    const url = `/jobs`;
    this.router.navigate([url]);
  }

}
