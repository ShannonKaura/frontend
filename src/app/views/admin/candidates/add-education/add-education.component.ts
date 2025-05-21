import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate, Education } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { DocumentService } from 'src/app/services/document.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.scss']
})
export class AddEducationComponent implements OnInit {

  public candidate!: Candidate;
  public education!: Education;

  public documents: any;
  public empty_document: boolean = true;
  public candidate_document: any;

  public candidate_resume: boolean = false;

  public candidate_basic_details: boolean = false;
  public candidate_professional_summary: boolean = false;
  public candidate_education: boolean = false;
  public candidate_skills: boolean = false;

  public profile_completion = 0


  constructor(
    @Inject(MAT_DIALOG_DATA) public candidatedatainfo: any,
    private dialogRef: MatDialogRef<AddEducationComponent>,
    private candidateService: CandidateService,
    private documentService: DocumentService,
  ) { }

  ngOnInit(): void {
    this.initEducation();
    this.getCandidateDocument();
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

  // get candidate document
  getCandidateDocument() {
    const candidateId = this.candidatedatainfo.id;

    if (candidateId) {
      this.documentService.getAllDocuments().subscribe((documents: any) => {
        this.documents = documents;

        if (this.documents.length > 0) {
          this.candidate_document = this.documents.filter((document: any) =>
            document.candidate_id === candidateId);

          if (this.candidate_document.length > 0) {
            this.candidate_resume = true;
          }
        }
      })
    }
  }

  onChangeStartDate(event: any) {
    this.education.start_date = event.value;

    console.log(this.education.start_date)
  }

  onChangeEndDate(event: any) {
    this.education.end_date = event.value;

    console.log(this.education.end_date)
  }


  //Edit Candidate Intro
  AddEducation(education: Education) {

    this.profile_completion = 0

    if (this.candidatedatainfo.first_name !== '') {
      this.candidate_basic_details = true;
      this.profile_completion += 20;
    }

    if (this.candidatedatainfo.summary !== '') {
      this.candidate_professional_summary = true;
      this.profile_completion += 20;
    }

    if (this.candidatedatainfo.skills.length > 0) {
      this.candidate_skills = true;
      this.profile_completion += 20;
    }


    if (this.candidate_resume) {
      this.profile_completion += 20;
    }

    // adding 20% for adding aducation details
    this.profile_completion += 20;

    this.candidatedatainfo.profile_completion = this.profile_completion;

    this.candidatedatainfo.education.push(education);
    this.candidateService.updateCandidate(this.candidatedatainfo).subscribe(updatedCandidate => {
      this.candidate = updatedCandidate;
      this.dialogRef.close();
    })
  }

  close() {
    this.dialogRef.close();
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
