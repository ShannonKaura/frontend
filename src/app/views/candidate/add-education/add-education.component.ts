import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate, Education } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { NotifierService } from 'src/app/services/notifier.service';

interface academicLevels {
  name?: string;
}

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.scss']
})

export class AddEducationComponent implements OnInit {

  public candidate!: Candidate;
  public education!: Education;
  public profile_completion: number = 0;
  public academic_levels!: academicLevels[];
  public certificate: boolean = false;
  public diploma: boolean = false;
  public associate: boolean = false;
  public bachelors_degree: boolean = false;
  public masters_degree: boolean = false;
  public secondary: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public candidatedatainfo: any,
    private dialogRef: MatDialogRef<AddEducationComponent>,
    private candidateService: CandidateService,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.initEducation();
    this.initAcademicLevels();
  }

  initAcademicLevels() {
    this.academic_levels = [
      { name: 'Certificate' },
      { name: 'Diploma' },
      { name: 'Associate' },
      { name: 'Bachelors Degree' },
      { name: 'Masters Degree' },
      { name: 'Secondary School' }
    ]
  }

  initEducation() {
    this.education = {
      academic_level: '',
      school: '',
      degree: '',
      field_of_study: '',
      start_date: '',
      end_date: '',
      grade: '',
      activities: '',
      description: '',
      media: '',
    }
  }

  onChangeStartDate(event: any) {
    this.education.start_date = event.value;
  }

  onChangeEndDate(event: any) {
    this.education.end_date = event.value;
  }


  //Edit Candidate Intro
  AddEducation(education: Education) {

    this.profile_completion = 0

    // basic details
    if (this.candidatedatainfo.first_name && this.candidatedatainfo.last_name && this.candidatedatainfo.country && this.candidatedatainfo.city && this.candidatedatainfo.dob) {
      this.profile_completion += 14;
    }

    // professional summary
    if (this.candidatedatainfo.summary) {
      this.profile_completion += 14;
    }

    // contact details
    if (this.candidatedatainfo.phone && this.candidatedatainfo.email) {
      this.profile_completion += 14;
    }

    // education
    this.profile_completion += 14;

    // skills
    if (this.candidatedatainfo.skills.length > 0) {
      this.profile_completion += 14;
    }

    // resume
    if (this.candidatedatainfo.documents.length > 0) {
      this.profile_completion += 15;
    }

    // audio
    if (this.candidatedatainfo.audio_id) {
      this.profile_completion += 15;
    }

    if (education.school) {
      this.candidatedatainfo.profile_completion = this.profile_completion;

      this.candidatedatainfo.education.push(education);
      this.candidateService.updateCandidate(this.candidatedatainfo).subscribe(updatedCandidate => {
        this.candidate = updatedCandidate;
        this.dialogRef.close();
        this.notifier.Notification("success", "Candidate Successfully Updated");
      })
    }
  }

  close() {
    this.dialogRef.close();
  }

  changeVacancy(event: any) {
    if (event.value === 'Certificate') {
      this.certificate = true;
    } else {
      this.certificate = false;
    }

    if (event.value === 'Diploma') {
      this.diploma = true;
    } else {
      this.diploma = false;
    }

    if (event.value === 'Associate') {
      this.associate = true;
    } else {
      this.associate = false;
    }

    if (event.value === 'Bachelors Degree') {
      this.bachelors_degree = true;
    } else {
      this.bachelors_degree = false;
    }

    if (event.value === 'Masters Degree') {
      this.masters_degree = true;
    } else {
      this.masters_degree = false;
    }

    if (event.value === 'Secondary School') {
      this.secondary = true;
    } else {
      this.secondary = false;
    }
  }

  getTitleMessage() {
    return 'Job title is required';
  }

  getEducationLocationCityMessage() {
    return 'City is required';
  }

  getEducationLocationCountryMessage() {
    return 'Country is required';
  }

  getCompanyMessage() {
    return 'Company is required';
  }

  getShcoolMessage() {
    return 'School Name is required';
  }


}
