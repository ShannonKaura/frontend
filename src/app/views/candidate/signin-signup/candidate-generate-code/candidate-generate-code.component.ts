import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateGenerateCodeService } from 'src/app/services/candidate-generate-code.service';
import { EmailService } from 'src/app/services/email.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-candidate-generate-code',
  templateUrl: './candidate-generate-code.component.html',
  styleUrls: ['./candidate-generate-code.component.scss']
})
export class CandidateGenerateCodeComponent implements OnInit {

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({}),
  };
  public email_baseurl!: string;
  public email_api_key!: string;

  public min: number = 100000;
  public max: number = 900000;

  public num!: number;

  public form: any = {
    email: null
  };

  public candidateUserData = {};
  public candidateuser: any;

  constructor(
    private candidateGenerateCodeService: CandidateGenerateCodeService,
    private sendResetEmailCode: EmailService,
    private router: Router,
    private candidateService: CandidateService,
    private notifier: NotifierService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.generateRandomCode(this.form.email);
  };

  generateRandomCode(candidateEmail: any) {
    // generating a 6 digit code
    this.num = Math.floor(Math.random() * this.min) + this.max;

    // user data
    this.candidateUserData = {
      email: this.form.email,
      code: this.num
    }

    this.candidateGenerateCodeService.setData(this.candidateUserData);

    this.Candidate(candidateEmail);
  }

  // check if email exists
  Candidate(candidateEmail: any) {
    this.candidateService.getAllCandidates().subscribe(returned => {
      this.candidateuser = returned.filter(c => c.email === this.form.email);

      if (this.candidateuser.length > 0) {
        this.sendResetEmailCode.SendResetPasswordEmail(this.num, candidateEmail);
        const url = `/verify-candidate-code/${this.form.email}`;
        this.router.navigate([url]);
      } else {
        this.notifier.Notification("warning", "Email does not exit");
      }
    });
  }

  Back() {
    const url = `/login`;
    this.router.navigate([url]);
  }


}
