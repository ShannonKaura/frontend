import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-developer-landing',
  templateUrl: './developer-landing.component.html',
  styleUrls: ['./developer-landing.component.scss']
})
export class DeveloperLandingComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public user: any;

  public page!: string;
  public subscription!: Subscription;

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private data: DataService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
    }

    this.subscription = this.data.currentPage.subscribe(page => this.page = page)
  }

  Login() {
    const url = `/login`;
    this.router.navigate([url]);
  }

  SignUP() {
    const url = `/signup`;
    this.router.navigate([url]);

    this.data.changePage("developer")
  }

  MyAccount() {
    const url = `/profile/${this.user.id}`;
    this.router.navigate([url]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
