import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate.service';
import { EmailService } from 'src/app/services/email.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { PushNotificationService } from 'src/app/services/push-notification.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { VacancyService } from 'src/app/services/vacancy.service';
import { AddDocumentModalComponent } from '../add-document-modal/add-document-modal.component';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {

  public all_vacancies: any;
  public created_timestamp: any;
  public current_date = new Date(Date.now()).getTime() / 1000;
  public selected_vacancy!: any;
  public selectedIndex!: number;
  public user!: any;
  public isLoggedIn = false;
  public logged_user!: any;
  public user_exists = false;
  public visibility = false;
  public loop_value = 0;
  public loading: boolean = false;

  public short_listed_candidate = {
    _id: ''
  }

  public interview = {
    vacancy_id: '',
    vacancy_name: '',
    vacancy_created_date: '',
    interview_notes: '',
    interview_score: '',
  }
  public updated_candidate: any;
  public returned_document: any;
  public vacancy_active: boolean = false;
  public available_active: boolean = true;
  public applied_active: boolean = false;
  public applied_vacancies: any = [];
  public show_applied_vacancies: any = [];

  constructor(
    private vacancies: VacancyService,
    private tokenStorageService: TokenStorageService,
    private candidateService: CandidateService,
    private vacancyService: VacancyService,
    private notifier: NotifierService,
    private emailService: EmailService,
    private dialog: MatDialog,
    private router: Router,
    private pushNotificationService: PushNotificationService
  ) { }

  ngOnInit(): void {
    // get vacancies on init

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    // this.user = this.tokenStorageService.getUser();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.getUserById(this.user.id);
    }

    this.getVacancies();
    this.requestPushNotificationSubscription();
  }

  requestPushNotificationSubscription() {
    if (this.isLoggedIn) {
      this.pushNotificationService.requestSubscription(this.user.id);
    }
  };

  getVacancies() {
    // get all vacancies
    this.loading = true;
    this.vacancies.getAllVacancies().subscribe(returned_vacancies => {
      // filter only active vacancies
      const today_date = new Date(Date.now());

      this.all_vacancies = returned_vacancies.filter(c => {

        const vacancy_expiry_date = new Date(c.expiry_date);

        // add 14 hours to expiry date
        vacancy_expiry_date.setHours(vacancy_expiry_date.getHours() + 18);

        return vacancy_expiry_date > today_date;

      })

      this.all_vacancies.forEach((vacancy: any) => {
        this.applied_vacancies.push(vacancy);
      });

      if (this.isLoggedIn) {
        this.applied_vacancies.forEach((x: any) => {

          // interested_candidates
          for (this.loop_value = 0; this.loop_value <= x.interested_candidates.length; this.loop_value++) {

            if (x.interested_candidates[this.loop_value]?._id === this.user?.id) {

              // get vacancy by ID
              this.vacancyService.getVacancyById(x.id).subscribe(returned_applied => {
                this.show_applied_vacancies.push(returned_applied);
              })
            }

            // rejected candidates
            if (x.rejected_candidates[this.loop_value]?._id === this.user?.id) {

              // get vacancy by ID
              this.vacancyService.getVacancyById(x.id).subscribe(returned_applied => {
                this.show_applied_vacancies.push(returned_applied);
              })
            }

            // shortlisted candidates
            if (x.shortlisted_candidates[this.loop_value]?._id === this.user?.id) {

              // get vacancy by ID
              this.vacancyService.getVacancyById(x.id).subscribe(returned_applied => {
                this.show_applied_vacancies.push(returned_applied);
              })
            }

            // under review candidates
            if (x.under_review_candidates[this.loop_value]?._id === this.user?.id) {

              // get vacancy by ID
              this.vacancyService.getVacancyById(x.id).subscribe(returned_applied => {
                this.show_applied_vacancies.push(returned_applied);
              })
            }

            // accepted candidates after interview
            if (x.accepted_candidates_after_interview[this.loop_value]?._id === this.user?.id) {

              // get vacancy by ID
              this.vacancyService.getVacancyById(x.id).subscribe(returned_applied => {
                this.show_applied_vacancies.push(returned_applied);
              })
            }

            // rejected candidates after interview
            if (x.rejected_candidates_after_interview[this.loop_value]?._id === this.user?.id) {

              // get vacancy by ID
              this.vacancyService.getVacancyById(x.id).subscribe(returned_applied => {
                this.show_applied_vacancies.push(returned_applied);
              })
            }

            // under review candidates after interview
            if (x.under_review_candidates_after_interview[this.loop_value]?._id === this.user?.id) {

              // get vacancy by ID
              this.vacancyService.getVacancyById(x.id).subscribe(returned_applied => {
                this.show_applied_vacancies.push(returned_applied);
              })
            }
          }
          this.loading = false;
        })
      } else {
        this.loading = false;
      }
    })
  }

  getSelectedJob(vacancy: any, _index: number) {
    this.selected_vacancy = vacancy;
    this.selectedIndex = _index;

    if (this.isLoggedIn) {
      if (this.userExists(this.user.id)) {
        this.user_exists = true;
      } else {
        this.user_exists = false;
      }
    }

    // check vacancy expiry
    this.checkVancancyExpiry(this.selected_vacancy.expiry_date)

  }

  selectedVacancy(vacancy: any) {
    const url = `/jobs/${vacancy.id}`;
    this.router.navigate([url]);
  }

  onClickAvailableVacancies() {
    this.available_active = true;
    this.applied_active = false;
  }

  onClickAppliedVacancies() {
    this.available_active = false;
    this.applied_active = true;
  }

  Apply() {
    if (this.isLoggedIn) {
      if (this.userExists(this.user.id)) {
        this.notifier.Notification("warning", "You have already applied for this job");
      } else {
        this.selected_vacancy.interested_candidates.push(this.short_listed_candidate)

        this.vacancyService.updateVacancy(this.selected_vacancy).subscribe(returned => {
          if (returned) {
            this.user_exists = true;

            // update user on interview information
            this.interview = {
              vacancy_id: this.selected_vacancy._id,
              vacancy_name: this.selected_vacancy.name,
              vacancy_created_date: this.selected_vacancy.created_date,
              interview_notes: '',
              interview_score: '',
            }

            this.logged_user.interview.push(this.interview);

            this.candidateService.updateCandidate(this.logged_user).subscribe(returned => {
              this.updated_candidate = returned;
              this.notifier.Notification("success", "Application sent");

              // send email to interested candidate
              this.IntestedCandidateSendEmail(this.logged_user?.first_name, this.logged_user?.middle_name, this.logged_user?.last_name, this.logged_user?.email, this.selected_vacancy?.name)

            })

          } else {
            this.notifier.Notification("warning", "Failed to send application");
          }
        })
      }


    } else {
      // login message
      this.loginModal();
    }



  }

  VisibilityOn(index: any) {
    this.visibility = true;

    console.log(index)
  }

  VisibilityOff() {
    this.visibility = false;
  }

  // send vacancy data also
  addDocumentModal() {
    const dialogRef = this.dialog.open(AddDocumentModalComponent, {
      width: '600px',
      maxHeight: '620px',
      data: this.selected_vacancy,
    });

    dialogRef.updatePosition({
      top: '4%',
    });
  }

  loginModal() {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '600px',
      maxHeight: '620px',
    });

    dialogRef.updatePosition({
      top: '4%',
    });
  }

  userExists(user_id: any) {
    return this.selected_vacancy.interested_candidates.some((obj: any) => obj._id === user_id)
  }

  getUserById(id: string) {
    this.candidateService.getCandidateById(id).subscribe(returned => {
      this.logged_user = returned;

      this.short_listed_candidate = {
        _id: this.logged_user._id,
      }
    })
  }

  // send email to interested candidate
  IntestedCandidateSendEmail(firstname: any, middlename: any, lastname: any, email: any, vacancy_position: any) {
    this.emailService.SendIntestedCandidateEmail(firstname, middlename, lastname, email, vacancy_position);
  }

  // check if vacancy date has not expired
  checkVancancyExpiry(selected_vacancy_expiry_date: any) {
    const vacancy_expiry_date = new Date(selected_vacancy_expiry_date);

    // add 14 hours to expiry date
    vacancy_expiry_date.setHours(vacancy_expiry_date.getHours() + 18);

    const today_date = new Date(Date.now());


    if (vacancy_expiry_date > today_date) {
      this.vacancy_active = true;
    } else if (vacancy_expiry_date < today_date) {
      this.vacancy_active = false;
    }

  }

}
