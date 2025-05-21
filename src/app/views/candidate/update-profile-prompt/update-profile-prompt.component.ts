import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-update-profile-prompt',
  templateUrl: './update-profile-prompt.component.html',
  styleUrls: ['./update-profile-prompt.component.scss']
})
export class UpdateProfilePromptComponent implements OnInit {

  public user_id: any;
  public incomplete_profile_details = false;
  public incomplete_professional_summary = false;
  public incomplete_education = false;
  public incomplete_skills = false;
  public incomplete_resume = false;

  constructor(
    private dialogRef: MatDialogRef<UpdateProfilePromptComponent>,
    @Inject(MAT_DIALOG_DATA) public prompt_type: any,
    private router: Router,
    private tokenStorageService: TokenStorageService,
  ) { }

  ngOnInit(): void {

    this.user_id = this.tokenStorageService.getUser().id;

    if (this.prompt_type === 'incomplete profile') {
      this.incomplete_profile_details = true;
    }

    if (this.prompt_type === 'professional summary') {
      this.incomplete_professional_summary = true;
    }

    if (this.prompt_type === 'education') {
      this.incomplete_education = true;
    }

    if (this.prompt_type === 'skills') {
      this.incomplete_skills = true;
    }

    if (this.prompt_type === 'resume') {
      this.incomplete_resume = true;
    }
  }

  close() {
    const url = `/profile/${this.user_id}`;
    this.router.navigate([url]);
    this.dialogRef.close();
  }

}
