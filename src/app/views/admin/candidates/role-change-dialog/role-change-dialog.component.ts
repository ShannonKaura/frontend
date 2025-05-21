import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CandidateService } from 'src/app/services/candidate.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { VacancyService } from 'src/app/services/vacancy.service';

@Component({
  selector: 'app-role-change-dialog',
  templateUrl: './role-change-dialog.component.html',
  styleUrls: ['./role-change-dialog.component.scss']
})
export class RoleChangeDialogComponent implements OnInit {

  public roles: any = [];
  public job_role = '';
  public candidate: any;

  constructor(
    private vacancyService: VacancyService,
    private dialogRef: MatDialogRef<RoleChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public candidatedatainfo: any,
    private candidateService: CandidateService,
    private notifier: NotifierService,
  ) {
    this.candidate = this.candidatedatainfo;
  }

  ngOnInit(): void {
    this.getRoles();
  }

  // get roles
  getRoles() {
    this.vacancyService.getAllVacancies().subscribe((returned: any) => {
      this.roles = returned;
    })
  }

  RoleChange(result: any) {
    this.job_role = result.value.name;

    // vancancy information
    const role = {
      job_name: result.value.name,
      id: result.value.id
    }

    this.candidate.job_role = role;

    this.candidateService.updateCandidate(this.candidate).subscribe(returned => {

      // get and update vacancy on accepted candidates
      this.vacancyService.getVacancyById(role.id).subscribe((returned: any) => {

        const interested_candidates = returned.interested_candidates.some((el: any) => {
          return el._id === this.candidate._id;
        })

        const rejected_candidates = returned.rejected_candidates.some((el: any) => {
          return el._id === this.candidate._id;
        })

        const rejected_candidates_after_interview = returned.rejected_candidates_after_interview.some((el: any) => {
          return el._id === this.candidate._id;
        })

        const shortlisted_candidates = returned.shortlisted_candidates.some((el: any) => {
          return el._id === this.candidate._id;
        })

        const under_review_candidates = returned.under_review_candidates.some((el: any) => {
          return el._id === this.candidate._id;
        })

        const under_review_candidates_after_interview = returned.under_review_candidates_after_interview.some((el: any) => {
          return el._id === this.candidate._id;
        })

        const accepted_candidates_after_interview = returned.accepted_candidates_after_interview.some((el: any) => {
          return el._id === this.candidate._id;
        })


        // check if candidate exists in other field , delete if it exists
        if (interested_candidates) {
          result.value.interested_candidates = result.value.interested_candidates.filter((x: any) => x._id !== this.candidate._id);
        }

        if (rejected_candidates) {
          result.value.rejected_candidates = result.value.rejected_candidates.filter((x: any) => x._id !== this.candidate._id);
        }

        if (rejected_candidates_after_interview) {
          result.value.rejected_candidates_after_interview = result.value.rejected_candidates_after_interview.filter((x: any) => x._id !== this.candidate._id);
        }

        if (shortlisted_candidates) {
          result.value.shortlisted_candidates = result.value.shortlisted_candidates.filter((x: any) => x._id !== this.candidate._id);
        }

        if (under_review_candidates) {
          result.value.under_review_candidates = result.value.under_review_candidates.filter((x: any) => x._id !== this.candidate._id);
        }

        if (under_review_candidates_after_interview) {
          result.value.under_review_candidates_after_interview = result.value.under_review_candidates_after_interview.filter((x: any) => x._id !== this.candidate._id);
        }

        if (accepted_candidates_after_interview) {
          result.value.accepted_candidates_after_interview = result.value.accepted_candidates_after_interview.filter((x: any) => x._id !== this.candidate._id);
        }

        const accept_date = new Date(Date.now()).getTime() / 1000;
        result.value.accepted_candidates_after_interview.push({ _id: this.candidate._id, accepted_date: accept_date, first_name: this.candidate.first_name, middle_name: this.candidate.middle_name, last_name: this.candidate.last_name });

        this.vacancyService.updateVacancy(result.value).subscribe(returned => {
          console.log('vacancy_updated', returned);
        })

      })
      this.notifier.Notification("success", "candidate successfully updated.");
    })

  }

  Close() {
    this.dialogRef.close();
  }
}
