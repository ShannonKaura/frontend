import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  public logged_in: boolean = false;
  public subscription!: Subscription;

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
    private dialogRef: MatDialogRef<LoginModalComponent>,
    @Inject(MAT_DIALOG_DATA) public vacancydatainfo: any,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private notifier: NotifierService,
    private data: DataService
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggenIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

    this.subscription = this.data.currentMessage.subscribe(message => this.logged_in = message)
  }

  onSubmit(): void {
    this.loading = true;
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe((data: any) => {
      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveUser(data);
      const url = `/jobs/${this.vacancydatainfo.id}`;
      this.router.navigate([url]);
      this.notifier.Notification("success", "logged in.");
      this.loading = false;
      this.logged_in = true;
      this.data.checkIfLoggedin(this.logged_in);
      this.dialogRef.close();
    }, err => {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
      this.notifier.Notification("warning", "failed to login (check your email or password).");
      this.loading = false;
    });
  };

  close() {
    this.dialogRef.close();
  }

  JoinNow() {
    const url = `/signup`;
    this.router.navigate([url]);
    this.dialogRef.close();
  }


  Cancel() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
