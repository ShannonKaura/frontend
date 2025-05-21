import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PushNotificationService } from 'src/app/services/push-notification.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { VacancyService } from 'src/app/services/vacancy.service';

@Component({
  selector: 'app-candidate-landing',
  templateUrl: './candidate-landing.component.html',
  styleUrls: ['./candidate-landing.component.scss'],
})
export class CandidateLandingComponent implements OnInit {

  public title = 'Apply for cutting edge international roles with YouPro Contact';
  public isLoggedIn: boolean = false;
  public user: any;
  public all_vacancies: any = [];
  public selected_vacancy!: any;
  public selectedIndex!: number;

  constructor(
    private router: Router,
    private vacancyService: VacancyService,
    private tokenStorageService: TokenStorageService,
    private titleService: Title,
    private metaService: Meta,
  ) {

    this.titleService.setTitle(this.title);

    this.metaService.addTags([
      { name: 'keywords', content: 'Recruiting, Apply today, Skillset as a service' },
      {
        name: 'description', content: 'Apply today. We are always looking for talent! Recruiting different professionals at different levels.If you are looking for work opportunities in Software Engineering/ Programming, Cyber Security, Digital Marketing, Graphic Design, IT Support, Helpdesk, Admin, Accounting / Bookkeeping, Sales / Marketing, Inbound / Outbound Calls, Lead Generation.'
      },
    ]);

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
    }

  }

  ngOnInit(): void {
    this.getVacancies();
  }


  // class to return all vacancies
  getVacancies() {
    this.vacancyService.getAllVacancies().subscribe(returned_vacancies => {

      // filter only active vacancies
      const today_date = new Date(Date.now());

      this.all_vacancies = returned_vacancies.filter(c => {

        const vacancy_expiry_date = new Date(c.expiry_date);

        // add 14 hours to expiry date
        vacancy_expiry_date.setHours(vacancy_expiry_date.getHours() + 18);

        return vacancy_expiry_date > today_date;

      });

      // limit array to the first two
      this.all_vacancies = this.all_vacancies.slice(0, 2);
    })
  }

  getSelectedJob(vacancy: any, _index: number) {
    this.selected_vacancy = vacancy;
    this.selectedIndex = _index;
  }

  ApplyNow() {
    const url = `/jobs`;
    this.router.navigate([url]);
  }

  selectedVacancy(vacancy: any) {
    const url = `/jobs/${vacancy.id}`;
    this.router.navigate([url]);
  }

  JoinNow() {
    const url = `/signup`;
    this.router.navigate([url]);
  }

  SignIn() {
    const url = `/login`;
    this.router.navigate([url]);
  }

  MyAccount() {
    const url = `/profile/${this.user.id}`;
    this.router.navigate([url]);
  }
}
