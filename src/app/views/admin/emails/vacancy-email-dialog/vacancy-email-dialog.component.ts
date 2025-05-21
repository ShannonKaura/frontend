import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Email } from 'src/app/models/email';
import { CandidateEmailService } from 'src/app/services/candidate-email.service';
import { EmailService } from 'src/app/services/email.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { VacancyService } from 'src/app/services/vacancy.service';

@Component({
  selector: 'app-vacancy-email-dialog',
  templateUrl: './vacancy-email-dialog.component.html',
  styleUrls: ['./vacancy-email-dialog.component.scss']
})


export class VacancyEmailDialogComponent implements OnInit {

  public sent_msg = 'sent';
  public candidate_email: any;
  public sending: boolean = false;

  public email: Email = {
    _id: '',
    email_name: 'Job Offer',
    email_text: {
      paragraph1: 'Hi {{params.FIRSTNAME}} {{params.MIDDLENAME}} {{params.LASTNAME}}',
      paragraph2: 'It is with great pleasure that we would like to offer you the position of {{params.VACANCYPOSITION}} at YouPro Contact',
      paragraph3: 'As discussed the offer is on a 4 week trial basis while you are part of ourgraduation-bay, during this period you will be assigned a trainer to mentor and look after your development.',
      paragraph4: 'The work agreement will be on an independent contractor basis. Hours of work are Monday to Friday 12:00 to 20:00, remuneration during the graduation-bay period and at sales trainee position will be prorated at $200 USD/month plus commission.',
      paragraph5: 'You have the opportunity to get promoted to sales advisor should you meet the set target in two out of four weeks, from which point your remuneration should rise to a prorated $350/month plus commission.',
      paragraph6: 'If you are happy with the offer your first day of work will be {{params.STARTDATE}} ({{params.STARTTIME}}) at 15th Floor, Joina City Harare Zimbabwe. Please confirm once you have had time to consider.',
      paragraph7: 'Look forward to hearing from you',
      paragraph8: 'Best Regards,',
      paragraph9: 'The Talent Acquisition Team at YouPro Contact',
      paragraph10: '',
    },
    created_by: {},
    modified_by: {},
    modified_date: new Date(Date.now()).getTime() / 1000,
  }


  constructor(
    @Inject(MAT_DIALOG_DATA) public datainfo: any,
    private dialogRef: MatDialogRef<VacancyEmailDialogComponent>,
    private notifier: NotifierService,
    private emailService: EmailService,
    private vacancyService: VacancyService,
    private candidateEmailService: CandidateEmailService
  ) {
  }

  ngOnInit(): void {
    this.email = {
      _id: '',
      email_text: {
        paragraph1: this.email.email_text.paragraph1,
        paragraph2: this.email.email_text.paragraph2,
        paragraph3: this.email.email_text.paragraph3,
        paragraph4: this.email.email_text.paragraph4,
        paragraph5: this.email.email_text.paragraph5,
        paragraph6: this.email.email_text.paragraph6,
        paragraph7: this.email.email_text.paragraph7,
        paragraph8: this.email.email_text.paragraph8,
        paragraph9: this.email.email_text.paragraph9,
        paragraph10: this.email.email_text.paragraph10,
      },
      email_name: 'Job Offer',
      created_by: '',
      modified_by: '',
      modified_date: new Date(Date.now()).getTime() / 1000,
    };

    this.getEmail();
  }

  getEmail() {
    this.candidateEmailService.getAllEmails().subscribe(returned => {
      this.candidate_email = returned.filter(email => email.email_name === "Job Offer");

      this.email = {
        _id: this.candidate_email[0]?._id,
        email_name: 'Job Offer',
        email_text: {
          paragraph1: `Hi ${this.datainfo.candidate_data.first_name} ${this.datainfo.candidate_data.middle_name} ${this.datainfo.candidate_data.last_name}`,
          paragraph2: this.candidate_email[0]?.email_text.paragraph2,
          paragraph3: this.candidate_email[0]?.email_text.paragraph3,
          paragraph4: this.candidate_email[0]?.email_text.paragraph4,
          paragraph5: this.candidate_email[0]?.email_text.paragraph5,
          paragraph6: this.candidate_email[0]?.email_text.paragraph6,
          paragraph7: this.candidate_email[0]?.email_text.paragraph7,
          paragraph8: this.candidate_email[0]?.email_text.paragraph8,
          paragraph9: this.candidate_email[0]?.email_text.paragraph9,
          paragraph10: this.candidate_email[0]?.email_text.paragraph10,
        },
        created_by: '',
        modified_by: '',
        modified_date: new Date(Date.now()).getTime() / 1000,
      }
    })
  }

  SaveEmail() {

    this.candidateEmailService.addEmail(this.email).subscribe(returned => {

    })
  }

  UpdateAndSendEmail(email: any) {
    this.sending = true;
    this.candidateEmailService.updateEmail(email).subscribe(returned => {
      this.emailService.JobOfferEmail(returned.email_text, this.datainfo.candidate_data.email).then(() => {
        this.notifier.Notification("success", "Email was successfully sent");
        this.sending = false;
        this.dialogRef.close();
      });
    })
  }

  close() {
    this.dialogRef.close();
  }

}
