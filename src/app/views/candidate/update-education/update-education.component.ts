import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate, Education } from 'src/app/models/candidate';
import { AudioService } from 'src/app/services/audio.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { DocumentService } from 'src/app/services/document.service';
import { NotifierService } from 'src/app/services/notifier.service';

interface academicLevels {
  name?: string;
}

@Component({
  selector: 'app-update-education',
  templateUrl: './update-education.component.html',
  styleUrls: ['./update-education.component.scss']
})
export class UpdateEducationComponent implements OnInit {

  public candidate!: Candidate;
  public education!: Education;
  public index!: any;
  public academic_levels!: academicLevels[];

  public certificate: boolean = false;
  public diploma: boolean = false;
  public associate: boolean = false;
  public bachelors_degree: boolean = false;
  public masters_degree: boolean = false;
  public secondary: boolean = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public candidatedatainfo: any,
    private dialogRef: MatDialogRef<UpdateEducationComponent>,
    private candidateService: CandidateService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    this.candidate = this.candidatedatainfo.candidate;
    this.index = this.candidatedatainfo.selected_index;
    this.initAcademicLevels();
    this.initEducation();

    // initialize academic level
    if (this.candidate.education[this.index].academic_level === 'Certificate') {
      this.certificate = true;
    } else {
      this.certificate = false;
    }

    if (this.candidate.education[this.index].academic_level === 'Diploma') {
      this.diploma = true;
    } else {
      this.diploma = false;
    }

    if (this.candidate.education[this.index].academic_level === 'Associate') {
      this.associate = true;
    } else {
      this.associate = false;
    }

    if (this.candidate.education[this.index].academic_level === 'Bachelors Degree') {
      this.bachelors_degree = true;
    } else {
      this.bachelors_degree = false;
    }

    if (this.candidate.education[this.index].academic_level === 'Masters Degree') {
      this.masters_degree = true;
    } else {
      this.masters_degree = false;
    }

    if (this.candidate.education[this.index].academic_level === 'Secondary School') {
      this.secondary = true;
    } else {
      this.secondary = false;
    }
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

  CurrentEducationStatus(event: any) {
    this.candidate.available = event.checked;
  }

  //Edit Candidate Intro
  UpdateEducation(candidate: any) {
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


  close() {
    this.dialogRef.close();
  }

  getEmailErrorMessage() {
    return 'Email is required';
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
