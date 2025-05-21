import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-update-candidate-bio',
  templateUrl: './update-candidate-bio.component.html',
  styleUrls: ['./update-candidate-bio.component.scss']
})
export class UpdateCandidateBioComponent implements OnInit {

  public candidate!: Candidate;
  public profile_completion: number = 0;
  public maxDate!: Date;
  public currentYear = new Date().getFullYear();

  constructor(
    @Inject(MAT_DIALOG_DATA) public candidatedatainfo: any,
    private dialogRef: MatDialogRef<UpdateCandidateBioComponent>,
    private candidateService: CandidateService,
    private notifier: NotifierService,
  ) {
    this.maxDate = new Date(this.currentYear - 16, 11, 31);
    console.log(this.maxDate)

  }

  ngOnInit(): void {
    this.candidate = this.candidatedatainfo;
  }

  getAge(date: any) {
    var today = new Date();
    var birthDate = new Date(date);
    var age = (today.getFullYear() - birthDate.getFullYear());
    var m = (today.getMonth() - birthDate.getMonth());
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  onChangeDob(event: any) {
    this.candidate.dob = event.value;
  }

  //Edit Candidate Intro
  UpdateCandidateIntro(candidate: any) {

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

    // update candidate bio
    if (candidate.first_name && candidate.last_name && candidate.country && candidate.city && candidate.dob) {

      candidate.profile_completion = this.profile_completion;

      this.candidateService.updateCandidate(candidate).subscribe(updatedCandidate => {
        this.candidate = updatedCandidate;
        this.dialogRef.close();
        this.notifier.Notification("success", "Candidate Successfully Updated");
      })
    } else {
      console.log("Complete all required fields")
    }

  }

  close() {
    this.dialogRef.close();
  }

  getFirstnameMessage() {
    return 'Firstname is required';
  }

  getLastnameMessage() {
    return 'Lastname is required';
  }

  getCountryMessage() {
    return 'Country is required';
  }

  getCityMessage() {
    return 'City is required';
  }

  getPhoneMessage() {
    return 'Phone number is required';
  }

}
