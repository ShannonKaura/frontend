import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-candidate-login',
  templateUrl: './candidate-login.component.html',
  styleUrls: ['./candidate-login.component.scss']
})
export class CandidateLoginComponent implements OnInit {

  public hide = true;
  public candidate = true;
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
    private authService: AuthService,
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

    this.authService.login(email, password).subscribe(data => {
      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveUser(data);
      const url = `/jobs`;
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
    const url = `/candidate-request-password-reset`;
    this.router.navigate([url]);
  }

  Cancel() {
    const url = `/`;
    this.router.navigate([url]);
  }
}

