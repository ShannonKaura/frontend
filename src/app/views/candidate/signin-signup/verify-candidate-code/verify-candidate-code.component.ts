import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateGenerateCodeService } from 'src/app/services/candidate-generate-code.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-verify-candidate-code',
  templateUrl: './verify-candidate-code.component.html',
  styleUrls: ['./verify-candidate-code.component.scss']
})
export class VerifyCandidateCodeComponent implements OnInit {

  public form: any = {
    code: null
  };

  constructor(
    private candidateGenerateCodeService: CandidateGenerateCodeService,
    private router: Router,
    private notifier: NotifierService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const resetPasswordCodeDataString: any = this.candidateGenerateCodeService.getData();

    const resetPasswordCodeData = JSON.parse(resetPasswordCodeDataString);

    if (Number(this.form.code) === resetPasswordCodeData.code) {

      const email: any = this.route.snapshot.paramMap.get('email');

      const url = `/update-candidate-password/${email}`;
      this.router.navigate([url]);
    } else {
      this.notifier.Notification("warning", "incorrect code.");
    }
  };
}
