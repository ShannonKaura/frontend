import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate } from 'src/app/models/candidate';
import { AudioService } from 'src/app/services/audio.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { DocumentService } from 'src/app/services/document.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-update-candidate-professional-summary',
  templateUrl: './update-candidate-professional-summary.component.html',
  styleUrls: ['./update-candidate-professional-summary.component.scss']
})
export class UpdateCandidateProfessionalSummaryComponent implements OnInit {

  public candidate!: Candidate;
  public profile_completion: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public candidatedatainfo: any,
    private dialogRef: MatDialogRef<UpdateCandidateProfessionalSummaryComponent>,
    private candidateService: CandidateService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    this.candidate = this.candidatedatainfo;
  }

  //Edit Candidate Intro
  UpdateCandidateProfessionalSummary(candidate: any) {

    this.profile_completion = 0

    // basic details
    if (candidate.first_name && candidate.last_name && candidate.country && candidate.city && candidate.dob) {
      this.profile_completion += 14;
    }

    // professional summary
    if (candidate.summary) {
      this.profile_completion += 14;
    }

    // contact details
    if (candidate.phone && candidate.email) {
      this.profile_completion += 14;
    }

    // education
    if (candidate.education.length > 0) {
      this.profile_completion += 14;
    }

    // skills
    if (candidate.skills.length > 0) {
      this.profile_completion += 14;
    }


    // resume
    if (this.candidate.documents.length > 0) {
      this.profile_completion += 15;
    }

    // audio
    if (this.candidate.audio_id) {
      this.profile_completion += 15;
    }

    if (candidate.summary) {

      candidate.profile_completion = this.profile_completion;

      this.candidateService.updateCandidate(candidate).subscribe(updatedCandidate => {
        this.candidate = updatedCandidate;
        this.dialogRef.close();
        this.notifier.Notification("success", "Candidate Successfully Updated");
      })
    }
  }

  close() {
    this.dialogRef.close();
  }

  getSummaryMessage() {
    return 'Professional Summary is required';
  }

}
