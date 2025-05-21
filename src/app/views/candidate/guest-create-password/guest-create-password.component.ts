import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate, CandidateConfirm } from 'src/app/models/candidate';
import { AuthService } from 'src/app/services/auth.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { VacancyService } from 'src/app/services/vacancy.service';

@Component({
  selector: 'app-guest-create-password',
  templateUrl: './guest-create-password.component.html',
  styleUrls: ['./guest-create-password.component.scss']
})
export class GuestCreatePasswordComponent implements OnInit {

  public candidate!: Candidate;
  public confirm!: CandidateConfirm;
  public email_exists: boolean = false;
  public hide = true;
  public checked = false;
  public disabled: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private notifier: NotifierService,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.initConfirm();
    this.initCandidate();
    this.getCandidate();
  }

  initConfirm(): void {
    this.confirm = {
      confirm_password: '',
    }
  }

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
      dob: '',
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

  getCandidate() {
    let candidate_id = this.route.snapshot.paramMap.get('id');

    this.candidateService.getCandidateById(candidate_id).subscribe(returned => {
      this.candidate = returned;
      this.candidate.password = "";
    })
  }

  getEmailErrorMessage() {
    return 'Email is required';
  }

  AgreeCheck(event: any) {
    if (event.checked === true && this.candidate.password) {
      this.checked = event.checked;

    } else {
      this.checked = event.checked;
    }
  }

  AgreeAndJoin() {
    this.candidateService.updateCandidatePassword(this.candidate).subscribe(returned => {
      this.notifier.Notification("success", "Password Updated successful");

      this.authService.login(this.candidate.email, this.candidate.password).subscribe(data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        const url = `/profile/${returned._id}`;
        this.router.navigate([url]);
      })
    })
  }

}
