import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminGenerateCodeService } from 'src/app/services/admin-generate-code.service';
import { EmailService } from 'src/app/services/email.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-generate-code',
  templateUrl: './admin-generate-code.component.html',
  styleUrls: ['./admin-generate-code.component.scss']
})
export class AdminGenerateCodeComponent implements OnInit {

  public min: number = 100000;
  public max: number = 900000;

  public num!: number;

  public form: any = {
    email: null
  };

  public adminUserData = {};
  public adminuser: any;

  constructor(
    private adminGenerateCodeService: AdminGenerateCodeService,
    private sendResetEmailCodeService: EmailService,
    private router: Router,
    private userService: UserService,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.generateRandomCode(this.form.email);
  };

  generateRandomCode(adminEmail: any) {
    // generating a 6 digit code
    this.num = Math.floor(Math.random() * this.min) + this.max;

    // user data
    this.adminUserData = {
      email: this.form.email,
      code: this.num
    }

    this.adminGenerateCodeService.setData(this.adminUserData);

    // send email
    this.User(adminEmail);
  }

  Back() {
    const url = `/admin-login`;
    this.router.navigate([url]);
  }

  // check if email exists
  User(adminEmail: any) {
    this.userService.getAllUsers().subscribe(returned => {
      this.adminuser = returned.filter(c => c.email === this.form.email);

      if (this.adminuser.length > 0) {

        // sending of the email if exists
        this.sendResetEmailCodeService.SendResetPasswordEmail(this.num, adminEmail);

        const url = `/verify-admin-code`;
        this.router.navigate([url]);


      } else {
        this.notifier.Notification("warning", "Email does not exit");
      }
    });
  }
}
