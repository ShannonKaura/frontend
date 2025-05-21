import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate, CandidateConfirm } from 'src/app/models/candidate';
import { CandidateGenerateCodeService } from 'src/app/services/candidate-generate-code.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-update-candidate-password',
  templateUrl: './update-candidate-password.component.html',
  styleUrls: ['./update-candidate-password.component.scss']
})
export class UpdateCandidatePasswordComponent implements OnInit {

  public candidate!: Candidate;
  public confirm!: CandidateConfirm;
  public hide = true;
  public isLoggedIn = false;
  public user: any;
  public candidateuser: any;
  public resetPasswordCodeData: any;
  public resetPasswordCodeDataString: any;
  public candidateId: any;

  constructor(
    private candidateService: CandidateService,
    private router: Router,
    private candidateGenerateCodeService: CandidateGenerateCodeService,
    private notifier: NotifierService,
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initConfirm();
    this.initCandidate();


    // get reset user candidate from storage
    this.resetPasswordCodeDataString = this.candidateGenerateCodeService.getData();
    this.resetPasswordCodeData = JSON.parse(this.resetPasswordCodeDataString);

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
    } else {
      const email = this.route.snapshot.paramMap.get('email');
      this.candidateService.getCandidateByEmail(email).subscribe((returned: any) => {
        this.candidateuser = returned;
        this.user = returned[0];
      });
    }
  }

  initConfirm(): void {
    this.confirm = {
      confirm_password: '',
    }
  }

  // initialize candidate model
  initCandidate() {
    this.candidate = {
      _id: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      headline: '',
      profile_image: '',
      available: false,
      job_title: '',
      experience: [],
      tools: [],
      projects: [],
      education: [],
      featured: [],
      date_of_birth: '',
      summary: '',
      skills: [],
      country: '',
      country_code: '',
      city: '',
      industry_category: '',
      email: '',
      phone: '',
      access_level: '',
      password: '',
      account_type: 'candidate',
      interview: [],
      original_candidate_record: {},
      modified_candidate_records: [],
      created_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
      profile_completion: 0,
      audio_id: '',
      documents: [],
      dob: new Date(Date.now()).getTime() / 1000,
      candidate_type: '',
      technical_skills: [],
      staff: false,
      employment_status: '',
      job_role: {
        job_name: '',
        id: ''
      },
    }
  }


  updatePassword() {
    /**
     * password input must not be empty
     * password inputs must match
     * returned candidate member must not be empty
     */
    this.candidateService.getCandidateById(this.user?.id).subscribe(returned => {
      this.candidateuser = returned;

      if (this.candidate.password && this.confirm.confirm_password === this.candidate.password) {
        this.candidateId = this.candidateuser._id;

        // reset the password by updating user

        this.candidateuser.password = this.candidate.password;

        this.candidateService.updateCandidatePassword(this.candidateuser).subscribe(updated_candidate => {
          this.candidate = updated_candidate;

          this.tokenStorageService.signOut();
          const url = `/login`;

          this.notifier.Notification("success", "Password update successful");
          this.router.navigate([url]);
        })
      }
    });
  }


  // link to profile
  GoToProfile() {
    const url = `/profile/${this.user?.id}`;
    this.router.navigate([url]);
  }

}
