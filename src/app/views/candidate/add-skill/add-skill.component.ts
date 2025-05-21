import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate, Skills } from 'src/app/models/candidate';
import { AudioService } from 'src/app/services/audio.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { DocumentService } from 'src/app/services/document.service';
import { NotifierService } from 'src/app/services/notifier.service';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss']
})
export class AddSkillComponent implements OnInit {

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  public candidate!: Candidate;
  public skill!: Skills;
  public profile_completion: number = 0;
  name = 'Angular';

  productForm: UntypedFormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public candidatedatainfo: any,
    private dialogRef: MatDialogRef<AddSkillComponent>,
    private candidateService: CandidateService,
    private notifier: NotifierService,
    private fb: UntypedFormBuilder
  ) {
    // this.productForm = this.fb.group({
    //   name: '',
    //   technicalSkills: this.fb.array([]),
    // });

    this.productForm = this.fb.group({
      technicalSkills: this.fb.array([]),
    });

    this.technicalSkills().push(this.newQuantity());
  }

  ngOnInit(): void {
    this.initSkill();
  }

  initSkill() {
    this.skill = {
      skill_name: '',
    }
  }

  //Edit Candidate Intro
  AddSkill(skill: Skills) {

    // first culculate profile completion rate
    this.profile_completion = 0

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
    if (this.candidatedatainfo.education.length > 0) {
      this.profile_completion += 14;
    }

    // adding 20% for adding new skill
    this.profile_completion += 14;

    // resume
    if (this.candidatedatainfo.documents.length > 0) {
      this.profile_completion += 15;
    }

    // audio
    if (this.candidatedatainfo.audio_id) {
      this.profile_completion += 15;
    }

    if (skill) {
      this.candidatedatainfo.profile_completion = this.profile_completion;

      this.candidatedatainfo.skills.push(skill);
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


  // adding skills

  technicalSkills(): UntypedFormArray {
    return this.productForm.get("technicalSkills") as UntypedFormArray
  }

  newQuantity(): UntypedFormGroup {
    return this.fb.group({
      skillName: '',
      yearsOfExperience: '',
      competency: '',
    })
  }

  addQuantity() {
    this.technicalSkills().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.technicalSkills().removeAt(i);
  }

  onSubmit1() {
    this.candidatedatainfo.technical_skills?.push(this.productForm.value.technicalSkills);

    // console.log(this.productForm.value.technicalSkills);
    console.log(this.candidatedatainfo);
  }

  onSubmit() {
    // first culculate profile completion rate
    this.profile_completion = 0

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
    if (this.candidatedatainfo.education.length > 0) {
      this.profile_completion += 14;
    }

    // adding 20% for adding new skill
    this.profile_completion += 14;

    // resume
    if (this.candidatedatainfo.documents.length > 0) {
      this.profile_completion += 15;
    }

    // audio
    if (this.candidatedatainfo.audio_id) {
      this.profile_completion += 15;
    }

    this.candidatedatainfo.profile_completion = this.profile_completion;

    // this.candidatedatainfo.skills.push(skill);
    const new_technical_skills_arr = this.productForm.value.technicalSkills;
    const available_skill_arr = this.candidatedatainfo.technical_skills;

    const all_arr = [...new_technical_skills_arr, ...available_skill_arr];

    this.candidatedatainfo.technical_skills = all_arr;
    this.candidateService.updateCandidate(this.candidatedatainfo).subscribe(updatedCandidate => {
      this.candidate = updatedCandidate;
      this.dialogRef.close();
      this.notifier.Notification("success", "Candidate Successfully Updated");
    })

    // console.log('1111111111111', new_technical_skills_arr);
    // console.log('2222222222222', available_skill_arr);
    // console.log('3333333333333', all_arr);
  }
}
