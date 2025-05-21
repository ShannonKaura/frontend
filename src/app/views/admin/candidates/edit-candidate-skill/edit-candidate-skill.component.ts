import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate, Skills } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { DocumentService } from 'src/app/services/document.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-candidate-skill',
  templateUrl: './edit-candidate-skill.component.html',
  styleUrls: ['./edit-candidate-skill.component.scss']
})
export class EditCandidateSkillComponent implements OnInit {

  public candidate!: Candidate;
  public candidateSkill!: Skills;
  public index!: any;

  public candidate_basic_details: boolean = false;
  public candidate_professional_summary: boolean = false;
  public candidate_education: boolean = false;
  public candidate_skills: boolean = false;
  public candidate_resume: boolean = false;

  public profile_completion = 0

  public documents: any;
  public empty_document: boolean = true;
  public candidate_document: any;


  constructor(
    @Inject(MAT_DIALOG_DATA) public candidatedatainfo: any,
    private dialogRef: MatDialogRef<EditCandidateSkillComponent>,
    private candidateService: CandidateService,
    private notifier: NotifierService,
    private documentService: DocumentService,
  ) { }

  ngOnInit(): void {
    this.candidate = this.candidatedatainfo.candidate;
    this.index = this.candidatedatainfo.selected_index;
    this.initCandidateSkill();
    this.getCandidateDocument();
  }

  initCandidateSkill() {
    this.candidateSkill = {
      skill_name: '',
    }
  }

  CurrentCandidateSkillStatus(event: any) {
    this.candidate.available = event.checked;
  }

  // get candidate document
  getCandidateDocument() {
    const candidateId = this.candidatedatainfo.candidate.id;

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


  //Edit Candidate Intro
  UpdateCandidateSkill(candidate: any) {

    this.profile_completion = 0

    if (candidate.first_name !== '') {
      this.candidate_basic_details = true;
      this.profile_completion += 20;
    }

    if (candidate.summary !== '') {
      this.candidate_professional_summary = true;
      this.profile_completion += 20;
    }

    if (candidate.education.length > 0) {
      this.candidate_education = true;
      this.profile_completion += 20;
    }

    if (this.candidate_resume) {


      this.profile_completion += 20;
    }

    // adding 20% for updating skill
    this.profile_completion += 20;

    candidate.profile_completion = this.profile_completion;

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

  getCandidateSkillLocationCityMessage() {
    return 'City is required';
  }

  getCandidateSkillLocationCountryMessage() {
    return 'Country is required';
  }

  getCompanyMessage() {
    return 'Company is required';
  }

  getShcoolMessage() {
    return 'School Name is required';
  }

}


