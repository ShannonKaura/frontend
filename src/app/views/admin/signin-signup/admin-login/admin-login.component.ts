import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  public hide = true;
  public admin = true;
  public loading = false;
  public isLoggenIn = false;
  public isLoginFailed = false;
  public roles = [];
  public errorMessage = '';
  public form: any = {
    email: null,
    password: null,
  };

  constructor(
    private router: Router,
    private authAdminService: AuthAdminService,
    private tokenStorage: TokenStorageService,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggenIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    this.loading = true;
    const { email, password } = this.form;

    this.authAdminService.login(email, password).subscribe((data: any) => {
      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveUser(data);
      const url = `/candidates`;
      this.router.navigate([url]);
      this.notifier.Notification("success", "logged in.");
      this.loading = false;
    }, err => {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
      this.notifier.Notification("warning", "failed to login (check your email or password).");
      this.loading = false;
    });
  };


  ForgotPassword() {
    const url = `/request-password-reset`;
    this.router.navigate([url]);
  }
}

