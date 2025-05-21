import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate, Skills } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { DocumentService } from 'src/app/services/document.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss']
})
export class AddSkillComponent implements OnInit {

  public candidate!: Candidate;
  public skill!: Skills;

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
    private dialogRef: MatDialogRef<AddSkillComponent>,
    private candidateService: CandidateService,
    private documentService: DocumentService,
  ) { }

  ngOnInit(): void {
    this.initSkill();
    this.getCandidateDocument();
  }

  initSkill() {
    this.skill = {
      skill_name: '',
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

          // replace https with http
          // this.document_link = this.document_link.replace("https", "http");
          if (this.candidate_document.length > 0) {
            this.candidate_resume = true;
          }
        }
      })
    }
  }

  //Edit Candidate Intro
  AddSkill(skill: Skills) {

    this.profile_completion = 0

    if (this.candidatedatainfo.first_name !== '') {
      this.candidate_basic_details = true;
      this.profile_completion += 20;
    }

    if (this.candidatedatainfo.summary !== '') {
      this.candidate_professional_summary = true;
      this.profile_completion += 20;
    }

    if (this.candidatedatainfo.education.length > 0) {
      this.candidate_education = true;
      this.profile_completion += 20;
    }


    if (this.candidate_resume) {
      this.profile_completion += 20;
    }

    // adding 20% for adding new skill
    this.profile_completion += 20;

    this.candidatedatainfo.profile_completion = this.profile_completion;

    this.candidatedatainfo.skills.push(skill);
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

  getSkillLocationCityMessage() {
    return 'City is required';
  }

  getSkillLocationCountryMessage() {
    return 'Country is required';
  }

  getCompanyMessage() {
    return 'Company is required';
  }


}
