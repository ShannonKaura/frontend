import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { DataService } from 'src/app/services/data.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-candidate-user',
  templateUrl: './candidate-user.component.html',
  styleUrls: ['./candidate-user.component.scss']
})
export class CandidateUserComponent implements OnInit {

  public loggedIn: boolean = false;
  public subscription!: Subscription;
  public isLoggedIn = false;
  public user: any;
  public logged_user!: Candidate;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private dialogRef: MatDialogRef<CandidateUserComponent>,
    private candidateService: CandidateService,
    private data: DataService
  ) { }

  ngOnInit(): void {

    this.logged_user = {
      _id: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      headline: "",
      profile_image: "",
      available: false,
      job_title: "",
      experience: "",
      tools: [],
      projects: [],
      education: "",
      featured: [],
      date_of_birth: {},
      summary: "",
      skills: "",
      country: "",
      country_code: "",
      city: "",
      industry_category: "",
      email: "",
      phone: "",
      access_level: "",
      password: "",
      account_type: "",
      interview: [],
      original_candidate_record: {},
      modified_candidate_records: [],
      created_by: "",
      created_date: {},
      profile_completion: 0,
      audio_id: "",
      documents: "",
      dob: "",
      candidate_type: "",
      technical_skills: [],
      staff: false,
      employment_status: "",
      job_role: {
        job_name: "",
        id: ""
      },
    }

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();

      this.getUserById(this.user.id)
    }

    this.subscription = this.data.currentMessage.subscribe(message => {
      this.loggedIn = message;
    });
  }

  UpdatePassword() {
    const url = `/update-candidate-password/${this.user.email}`;
    this.router.navigate([url]);
    this.dialogRef.close();
  }

  ViewProfile() {
    const url = `/profile/${this.user.id}`;
    this.router.navigate([url]);
    this.dialogRef.close();
  }

  Logout() {
    if (this.isLoggedIn) {
      this.tokenStorageService.signOut();
      this.router.navigate(['/']);
      this.dialogRef.close();

      // change message on loogedin obsavable
      this.data.checkIfLoggedin(false);
    }
  }

  getUserById(id: string) {
    this.candidateService.getCandidateById(id).subscribe(returned => {
      this.logged_user = returned;
    })
  }

}
