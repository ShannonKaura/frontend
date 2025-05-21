import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { DocumentService } from 'src/app/services/document.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-candidate-professional-summary',
  templateUrl: './edit-candidate-professional-summary.component.html',
  styleUrls: ['./edit-candidate-professional-summary.component.scss']
})
export class EditCandidateProfessionalSummaryComponent implements OnInit {

  public candidate!: Candidate;
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
    private dialogRef: MatDialogRef<EditCandidateProfessionalSummaryComponent>,
    private candidateService: CandidateService,
    private notifier: NotifierService,
    private documentService: DocumentService,
  ) { }

  ngOnInit(): void {
    this.candidate = this.candidatedatainfo;
    this.getCandidateDocument();
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
  UpdateCandidateProfessionalSummary(candidate: any) {

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

    if (candidate.skills.length > 0) {
      this.candidate_skills = true;
      this.profile_completion += 20;
    }

    if (this.candidate_resume) {
      this.profile_completion += 20;
    }

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

  getSummaryMessage() {
    return 'Professional Summary is required';
  }

}
