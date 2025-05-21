import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-update-availability',
  templateUrl: './update-availability.component.html',
  styleUrls: ['./update-availability.component.scss']
})
export class UpdateAvailabilityComponent implements OnInit {

  public candidate!: Candidate;

  constructor(
    @Inject(MAT_DIALOG_DATA) public candidatedatainfo: any,
    private dialogRef: MatDialogRef<UpdateAvailabilityComponent>,
    private candidateService: CandidateService,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.candidate = this.candidatedatainfo;
  }

  CurrentAvailabilityStatus(event: any) {
    this.candidate.available = event.checked;
  }

  //Edit Candidate Intro
  UpdateAvailabilty(candidate: any) {
    this.candidateService.updateCandidate(candidate).subscribe(updatedCandidate => {
      if (updatedCandidate) {
        this.candidate = updatedCandidate;
        this.dialogRef.close();
        this.notifier.Notification("success", "Candidate Successfully Updated");
      } else {
        this.notifier.Notification("warning", "Could not update");
      }
    })
  }

  close() {
    this.dialogRef.close();
  }

  getEmailErrorMessage() {
    return 'Email is required';
  }

}
