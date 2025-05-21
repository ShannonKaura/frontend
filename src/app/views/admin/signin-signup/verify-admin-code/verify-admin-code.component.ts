import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminGenerateCodeService } from 'src/app/services/admin-generate-code.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-verify-admin-code',
  templateUrl: './verify-admin-code.component.html',
  styleUrls: ['./verify-admin-code.component.scss']
})
export class VerifyAdminCodeComponent implements OnInit {

  public form: any = {
    code: null
  };

  constructor(
    private adminGenerateCodeService: AdminGenerateCodeService,
    private router: Router,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const resetPasswordCodeDataString: any = this.adminGenerateCodeService.getData();

    const resetPasswordCodeData = JSON.parse(resetPasswordCodeDataString);

    if (Number(this.form.code) === resetPasswordCodeData.code) {
      const url = `/update-admin-password`;
      this.router.navigate([url]);
    } else {
      this.notifier.Notification("warning", "incorrect code.");
    }
  };
}
