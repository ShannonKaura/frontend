import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from 'src/app/models/candidate';
import { AudioService } from 'src/app/services/audio.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { AddDocumentComponent } from '../add-document/add-document.component';
import { AddEducationComponent } from '../add-education/add-education.component';
import { AddExperienceComponent } from '../add-experience/add-experience.component';
import { AddMediaComponent } from '../add-media/add-media.component';
import { AddSkillComponent } from '../add-skill/add-skill.component';
import { EditCandidateBioComponent } from '../edit-candidate-bio/edit-candidate-bio.component';
import { EditCandidateProfessionalSummaryComponent } from '../edit-candidate-professional-summary/edit-candidate-professional-summary.component';
import { EditCandidateSkillComponent } from '../edit-candidate-skill/edit-candidate-skill.component';
import { EditEducationComponent } from '../edit-education/edit-education.component';
import { EditExperienceComponent } from '../edit-experience/edit-experience.component';
import { Track } from 'ngx-audio-player';
import { EditMediaComponent } from '../edit-media/edit-media.component';
import { DocumentService } from 'src/app/services/document.service';
import { EditDocumentComponent } from '../edit-document/edit-document.component';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { DomSanitizer } from '@angular/platform-browser';
import { VacancyService } from 'src/app/services/vacancy.service';

@Component({
  selector: 'app-edit-candidate',
  templateUrl: './edit-candidate.component.html',
  styleUrls: ['./edit-candidate.component.scss']
})
export class EditCandidateComponent implements OnInit {

  public candidate!: Candidate;
  public maxDate: Date = new Date();
  public hide = true;
  public candidate_audio: any;
  public candidate_document: any;
  public audios: any;
  public documents: any;
  public empty_audio: boolean = true;
  public empty_document: boolean = true;
  public document_link: string = '';
  public roles: any = [];


  // audio player variables
  public audiopDisplayTitle = false;
  public audiopDisplayPlayList = true;
  public audiopPageSizeOptions = [2, 4, 6];
  public audiopDisplayVolumeControls = true;
  public audiopDisplayRepeatControls = true;
  public audiopDisplayArtist = false;
  public audiopDisplayDuration = false;
  public audiopDisablePositionSlider = true;
  public currentTrack = null;
  public interviews: any = [];

  public audio_link: string = '';

  public audiopPlaylist: Track[] = [
    {
      title: '',
      link: '',
      artist: '',
      duration: 0
    },
  ];


  public my_index = 0;
  public interview_notes: any;
  public interview_score: any;
  public show_interview_page: boolean = false;

  public document_base64: any;
  public document_name: any;
  public documetSelectedFileBLOB: any;

  public audio_base64: any;
  public audio_name: any;
  public audioSelectedFileBLOB: any;

  public candidate_basic_details: boolean = false;
  public candidate_professional_summary: boolean = false;
  public candidate_education: boolean = false;
  public candidate_skills: boolean = false;
  public candidate_resume: boolean = false;
  public profile_completion = 0
  public unfinished_upload: boolean = false;
  public decision_made = '';
  public role_text_field: boolean = false;
  public role_text_selected: boolean = false;

  public interested_candidates: any = [];
  public interested_candidates2: any;
  public available_interested_candidates: any;

  constructor(
    private candidateService: CandidateService,
    private audioService: AudioService,
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private notifier: NotifierService,
    private sanitizer: DomSanitizer,
    private vacancyService: VacancyService,
  ) { }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  ngOnInit(): void {
    this.initCandidate();
    this.getCandidate();
    this.getRoles();
    // this.getVacancies();
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
      created_date: {},
      profile_completion: 0,
      audio_id: '',
      documents: [],
      dob: {},
      candidate_type: '',
      technical_skills: [],
      staff: false,
      employment_status: '',
      job_role: {
        job_name: '',
        id: '',
      },
    }
  }

  // get candidate by Id
  getCandidate() {
    const candidateId = this.route.snapshot.paramMap.get('id');

    this.candidateService.getCandidateById(candidateId).subscribe(returnedcandidate => {

      this.candidate = returnedcandidate;
      this.interviews = this.candidate.interview;

      if (!returnedcandidate.job_role) {
        const role = {
          job_name: '',
          id: ''
        }
        this.candidate.job_role = role;
      }

      this.getCandidateAudio(this.candidate);
      this.getCandidateDocument(this.candidate);
    });
  }

  // get candidate audio
  getCandidateAudio(candidate: any) {
    if (candidate.audio_id) {
      this.empty_audio = false;

      this.audioService.getAudioById(candidate.audio_id).subscribe(returned_audio => {
        if (returned_audio.audio) {
          this.audio_base64 = returned_audio.audio;
          this.audio_name = returned_audio.audio_name;

          // coverting base64 string to file
          this.audioDataURLtoFile(this.audio_base64, this.audio_name);
        } else {
          this.empty_audio = true;
        }
      })
    } else {
      this.empty_audio = true;
    }
  }


  // get candidate document
  getCandidateDocument(candidate: any) {
    if (candidate.documents.length > 0) {
      this.empty_document = false;
      this.candidate_resume = true;

      candidate.documents.forEach((element: any) => {
        this.documentService.getDocumentById(element).subscribe(returned_doc => {
          if (returned_doc.document) {
            this.document_base64 = returned_doc.document;
            this.document_name = returned_doc.document_name;

            // coverting base64 string to file
            this.documentDataURLtoFile(this.document_base64, this.document_name);
          } else if (!returned_doc.document) {
            this.unfinished_upload = true;
          }
        })
      });

    } else {
      this.empty_document = true;
    }
  }

  updateRoleField(candidate: any) {
    this.candidateService.updateCandidate(candidate).subscribe(returned => {
      console.log("role field added")
    })
  }

  // get roles
  getRoles() {
    this.vacancyService.getAllVacancies().subscribe((returned: any) => {
      this.roles = returned;
    })
  }

  documentDataURLtoFile(dataurl: any, filename: any) {
    const url = dataurl;
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];

    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], filename, { type: mime });

        let url = window.URL.createObjectURL(file);

        this.documetSelectedFileBLOB = this.sanitizer.bypassSecurityTrustUrl(url);
      })
  }

  audioDataURLtoFile(dataurl: any, filename: any) {
    const url = dataurl;
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];

    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], filename, { type: mime });

        let url = window.URL.createObjectURL(file);

        this.audioSelectedFileBLOB = this.sanitizer.bypassSecurityTrustUrl(url);

        this.audiopPlaylist = [
          {
            title: 'Candidate Audio',
            link: this.audioSelectedFileBLOB,
            artist: '',
            duration: 10000
          },
        ];

      })
  }

  // download document
  DownloadDocument() {
    const url = `${this.document_link}`;

    window.open(url, "_blank");
  }


  onEnded(event: any) {
    this.currentTrack = null;
  }



  //update candidate
  updateCandidate(candidate: Candidate) {

    this.profile_completion = 0

    if (this.candidate.first_name !== '') {
      this.candidate_basic_details = true;
      this.profile_completion += 20;
    }

    if (this.candidate.summary !== '') {
      this.candidate_professional_summary = true;
      this.profile_completion += 20;
    }

    if (this.candidate.education.length > 0) {
      this.candidate_education = true;
      this.profile_completion += 20;
    }

    if (this.candidate.skills.length > 0) {
      this.candidate_skills = true;
      this.profile_completion += 20;
    }

    if (this.candidate_resume) {
      this.profile_completion += 20;
    }

    this.candidate.profile_completion = this.profile_completion;

    this.candidateService.updateCandidate(candidate).subscribe(updatedCandidate => {
      this.candidate = updatedCandidate;

      if (this.candidate) {
        this.notifier.Notification("success", "candidate successfully updated.");
      } else {
        this.notifier.Notification("warning", "failed to update.");
      }
    })
  }

  UpdateInterview(candidate: Candidate) {

    this.interviews[this.my_index].interview_notes = this.interview_notes;
    this.interviews[this.my_index].interview_score = this.interview_score;

    this.candidate.interview = this.interviews;

    this.candidateService.updateCandidate(candidate).subscribe(updatedCandidate => {
      this.candidate = updatedCandidate;

      if (this.candidate) {
        this.notifier.Notification("success", "candidate successfully updated.");
      } else {
        this.notifier.Notification("warning", "failed to update.");
      }
    })
  }

  //update candidate bio
  openEditCandidateBio(selected: any): void {
    const dialogRef = this.dialog.open(EditCandidateBioComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });
  }

  //update professional summary
  openEditProfessionalSummary(selected: any) {
    const dialogRef = this.dialog.open(EditCandidateProfessionalSummaryComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });
  }

  //update experience
  openEditExperience(selected: any, index: any) {
    const dialogRef = this.dialog.open(EditExperienceComponent, {
      width: '50%',
      maxHeight: '620px',
      data: { candidate: selected, selected_index: index },
    });

    dialogRef.updatePosition({
      top: '4%',
    });
  }

  //update professional summary
  openEditEducation(selected: any, index: any) {
    const dialogRef = this.dialog.open(EditEducationComponent, {
      width: '50%',
      maxHeight: '620px',
      data: { candidate: selected, selected_index: index },
    });

    dialogRef.updatePosition({
      top: '4%',
    });
  }

  //update professional summary
  openEditSkill(selected: any, index: any) {
    const dialogRef = this.dialog.open(EditCandidateSkillComponent, {
      width: '50%',
      maxHeight: '620px',
      data: { candidate: selected, selected_index: index },
    });

    dialogRef.updatePosition({
      top: '4%',
    });
  }

  //Add candidate education
  openAddEducation(selected: any) {
    const dialogRef = this.dialog.open(AddEducationComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

  }

  //add skill to candidate
  openAddSkill(selected: any) {
    const dialogRef = this.dialog.open(AddSkillComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });
  }

  //add experience to candidate
  openAddExperience(selected: any) {
    const dialogRef = this.dialog.open(AddExperienceComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });
  }

  //add skill to candidate
  openMedia(selected: any) {
    const dialogRef = this.dialog.open(AddMediaComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openEditMedia(selected: any) {
    const dialogRef = this.dialog.open(EditMediaComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  //add skill to candidate
  openDocument(selected: any) {
    const dialogRef = this.dialog.open(AddDocumentComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openEditDocument(selected: any) {
    const dialogRef = this.dialog.open(EditDocumentComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getScoreMessage() {
    return "max value is 5 and min value is 1"
  }

  changeVacancy(event: any) {

    const index = event.value;
    this.my_index = index;

    this.interviews = this.candidate.interview;

    this.interview_notes = this.interviews[index].interview_notes;
    this.interview_score = this.interviews[index].interview_score;
    this.decision_made = this.interviews[index].interview_decision;


    this.show_interview_page = true;
  }

  toggleUser(result: any) {
    const role = {
      job_name: '',
      id: ''
    }

    this.candidate.job_role = role;

    this.candidateService.updateCandidate(this.candidate).subscribe(returned => {
      if (!this.candidate.staff) {
        this.role_text_selected = false;
        this.role_text_field = true;
      }
      this.notifier.Notification("success", "candidate successfully updated.");

      // check if candidate exists in any of vacancy lists

    })
  }

  RoleChange(result: any) {
    const role = {
      job_name: result.value.name,
      id: result.value.id
    }

    this.candidate.job_role = role;

    this.candidateService.updateCandidate(this.candidate).subscribe(returned => {
      this.candidate = returned;
      this.role_text_field = false;
      this.role_text_selected = true;

      // get and update vacancy on accepted candidates
      this.vacancyService.getVacancyById(role.id).subscribe((returned: any) => {

        const interested_candidates = returned.interested_candidates.some((el: any) => {
          return el._id === this.candidate._id;
        })

        const rejected_candidates = returned.rejected_candidates.some((el: any) => {
          return el._id === this.candidate._id;
        })

        const rejected_candidates_after_interview = returned.rejected_candidates_after_interview.some((el: any) => {
          return el._id === this.candidate._id;
        })

        const shortlisted_candidates = returned.shortlisted_candidates.some((el: any) => {
          return el._id === this.candidate._id;
        })

        const under_review_candidates = returned.under_review_candidates.some((el: any) => {
          return el._id === this.candidate._id;
        })

        const under_review_candidates_after_interview = returned.under_review_candidates_after_interview.some((el: any) => {
          return el._id === this.candidate._id;
        })

        const accepted_candidates_after_interview = returned.accepted_candidates_after_interview.some((el: any) => {
          return el._id === this.candidate._id;
        })


        // check if candidate exists in other field , delete if it exists
        if (interested_candidates) {
          result.value.interested_candidates = result.value.interested_candidates.filter((x: any) => x._id !== this.candidate._id);
        }

        if (rejected_candidates) {
          result.value.rejected_candidates = result.value.rejected_candidates.filter((x: any) => x._id !== this.candidate._id);
        }

        if (rejected_candidates_after_interview) {
          result.value.rejected_candidates_after_interview = result.value.rejected_candidates_after_interview.filter((x: any) => x._id !== this.candidate._id);
        }

        if (shortlisted_candidates) {
          result.value.shortlisted_candidates = result.value.shortlisted_candidates.filter((x: any) => x._id !== this.candidate._id);
        }

        if (under_review_candidates) {
          result.value.under_review_candidates = result.value.under_review_candidates.filter((x: any) => x._id !== this.candidate._id);
        }

        if (under_review_candidates_after_interview) {
          result.value.under_review_candidates_after_interview = result.value.under_review_candidates_after_interview.filter((x: any) => x._id !== this.candidate._id);
        }

        if (accepted_candidates_after_interview) {
          result.value.accepted_candidates_after_interview = result.value.accepted_candidates_after_interview.filter((x: any) => x._id !== this.candidate._id);
        }


        const accept_date = new Date(Date.now()).getTime() / 1000;
        result.value.accepted_candidates_after_interview.push({ _id: this.candidate._id, accepted_date: accept_date, first_name: this.candidate.first_name, middle_name: this.candidate.middle_name, last_name: this.candidate.last_name });

        this.vacancyService.updateVacancy(result.value).subscribe(returned => {
          console.log('vacancy_updated', returned);
        })

      })

      this.notifier.Notification("success", "candidate successfully updated.");
    })
  }

  editSelectRole() {
    this.role_text_field = true;
  }

  toggleStaff(event: any) { }

  // get vacancies
  getVacancies() {
    this.vacancyService.getAllVacancies().subscribe(returned => {
      returned.forEach((x: any) =>

        this.interested_candidates.push(...x.interested_candidates),
        console.log('xxxxxxxxxx', this.interested_candidates)

      );
      returned.forEach(x => console.log('accepted_candidates_after_interview', x.accepted_candidates_after_interview));
      returned.forEach(x => console.log('rejected_candidates', x.rejected_candidates));
      returned.forEach(x => console.log('rejected_candidates_after_interview', x.rejected_candidates_after_interview));
      returned.forEach(x => console.log('shortlisted_candidates', x.shortlisted_candidates));
      returned.forEach(x => console.log('under_review_candidates', x.under_review_candidates));
      returned.forEach(x => console.log('under_review_candidates_after_interview', x.under_review_candidates_after_interview));
    })
  }
}
