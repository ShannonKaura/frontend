import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate, Skills } from 'src/app/models/candidate';
import { AudioService } from 'src/app/services/audio.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { DocumentService } from 'src/app/services/document.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-update-candidate-skill',
  templateUrl: './update-candidate-skill.component.html',
  styleUrls: ['./update-candidate-skill.component.scss']
})
export class UpdateCandidateSkillComponent implements OnInit {

  public candidate!: Candidate;
  public candidateSkill!: Skills;
  public index!: any;
  public profile_completion: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public candidatedatainfo: any,
    private dialogRef: MatDialogRef<UpdateCandidateSkillComponent>,
    private candidateService: CandidateService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    this.candidate = this.candidatedatainfo.candidate;
    this.index = this.candidatedatainfo.selected_index;
    this.initCandidateSkill();
  }

  initCandidateSkill() {
    this.candidateSkill = {
      skill_name: '',
    }
  }

  CurrentCandidateSkillStatus(event: any) {
    this.candidate.available = event.checked;
  }

  //Edit Candidate Intro
  UpdateCandidateSkill(candidate: any) {
    this.candidateService.updateCandidate(candidate).subscribe(updatedCandidate => {
      this.candidate = updatedCandidate;
      this.dialogRef.close();
      this.notifier.Notification("success", "Candidate Successfully Updated");
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

