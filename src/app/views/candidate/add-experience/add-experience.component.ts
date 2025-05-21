import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate, Experience } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.scss']
})
export class AddExperienceComponent implements OnInit {

  public candidate!: Candidate;
  public experience!: Experience;

  constructor(
    @Inject(MAT_DIALOG_DATA) public candidatedatainfo: any,
    private dialogRef: MatDialogRef<AddExperienceComponent>,
    private candidateService: CandidateService,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
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

    console.log(this.experience.start_date)
  }

  onChangeEndDate(event: any) {
    this.experience.end_date = event.value;

    console.log(this.experience.end_date)
  }

  CurrentWorkStatus(event: any) {
    this.experience.currently_working = event.checked;

    console.log(this.experience.currently_working);
  }

  //Edit Candidate Intro
  AddExperience(experience: Experience) {
    this.candidatedatainfo.experience.push(experience);
    this.candidateService.updateCandidate(this.candidatedatainfo).subscribe(updatedCandidate => {
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
