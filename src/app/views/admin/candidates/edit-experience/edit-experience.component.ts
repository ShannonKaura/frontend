import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate, Experience } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { CountryService } from 'src/app/services/country.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.scss']
})
export class EditExperienceComponent implements OnInit {

  public candidate!: Candidate;
  public experience!: Experience;
  public index!: any;
  public countries: any;


  constructor(
    @Inject(MAT_DIALOG_DATA) public candidatedatainfo: any,
    private dialogRef: MatDialogRef<EditExperienceComponent>,
    private candidateService: CandidateService,
    private notifier: NotifierService,
    private countryService: CountryService,
  ) { }

  ngOnInit(): void {
    this.getCountries();
    this.candidate = this.candidatedatainfo.candidate;
    this.index = this.candidatedatainfo.selected_index;
    this.initExperience();
  }


  getCountries() {
    this.countryService.getAllCountries().subscribe(returned_countries => {
      this.countries = returned_countries
    })
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
      this.candidate = updatedCandidate;

      if (this.candidate) {

        this.notifier.Notification("success", "candidate successfully updated.");
        this.dialogRef.close();
      } else {
        this.notifier.Notification("warning", "failed to save.");
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
