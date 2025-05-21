import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate, Experience } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-update-experience',
  templateUrl: './update-experience.component.html',
  styleUrls: ['./update-experience.component.scss']
})
export class UpdateExperienceComponent implements OnInit {

  public candidate!: Candidate;
  public experience!: Experience;
  public index!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public candidatedatainfo: any,
    private dialogRef: MatDialogRef<UpdateExperienceComponent>,
    private candidateService: CandidateService,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.candidate = this.candidatedatainfo.candidate;
    this.index = this.candidatedatainfo.selected_index;
    this.initExperience();
  }

  initExperience() {
    this.experience = {
      title: '',
      employment_type: '',
      company: '',
      location: {
        country: '',
        city: '',
      },
      currently_working: '',
      start_date: '',
      end_date: '',
      description: '',
      media: '',
    }
  }

  onChangeStartDate(event: any) {
    this.experience.start_date = event.value;
  }

  onChangeEndDate(event: any) {
    this.experience.end_date = event.value;
  }

  CurrentWorkStatus(event: any) {
    this.experience.currently_working = event.checked;
  }

  CurrentExperienceStatus(event: any) {
    this.candidate.available = event.checked;
  }

  //Edit Candidate Intro
  UpdateExperience(candidate: any) {
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

  getTitleMessage() {
    return 'Job title is required';
  }

  getExperienceLocationCityMessage() {
    return 'City is required';
  }

  getExperienceLocationCountryMessage() {
    return 'Country is required';
  }

  getCompanyMessage() {
    return 'Company is required';
  }

}
