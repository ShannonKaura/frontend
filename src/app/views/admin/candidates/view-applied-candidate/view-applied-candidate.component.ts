import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Track } from 'ngx-audio-player';
import { Subscription } from 'rxjs';
import { Candidate, Education, Experience } from 'src/app/models/candidate';
import { AudioService } from 'src/app/services/audio.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { DataService } from 'src/app/services/data.service';
import { DocumentService } from 'src/app/services/document.service';
import { EmailService } from 'src/app/services/email.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { VacancyService } from 'src/app/services/vacancy.service';
import { VacancyEmailDialogComponent } from '../../emails/vacancy-email-dialog/vacancy-email-dialog.component';

@Component({
  selector: 'app-view-applied-candidate',
  templateUrl: './view-applied-candidate.component.html',
  styleUrls: ['./view-applied-candidate.component.scss']
})
export class ViewAppliedCandidateComponent implements OnInit {

  public candidate!: Candidate;
  public maxDate: Date = new Date();
  public hide = true;
  public shortlisted: boolean = false;
  public rejected: boolean = false;
  public selected_option: boolean = false;
  public under_review: boolean = false;
  public interview_date: any;
  public interview_time: any;

  public start_date: Date = new Date(Date.now());
  public start_time: any;
  public salary: any;

  public starting_details = false;

  public audios: any;
  public documents: any;
  public candidate_audio: any;
  public candidate_document: any;

  public empty_audio: boolean = true;
  public empty_document: boolean = true;
  public document_link: string = '';

  public document_base64: any;
  public document_name: any;
  public documetSelectedFileBLOB: any;

  public audio_base64: any;
  public audio_name: any;
  public audioSelectedFileBLOB: any;

  public candidate_resume: boolean = false;

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
  public candidate_is_shortlisted = false;

  public my_index = 0;
  public interview_notes: any;
  public interview_score: any;
  public show_interview_page: boolean = false;
  public interviews: any = [];


  public experience: Experience = {
    title: '',
    employment_type: '',
    company: '',
    location: {
      country: '',
      city: '',
    },
    currently_working: '',
    start_date: '',
    end_date: '',
    description: '',
    media: '',
  }

  public education: Education = {
    academic_level: '',
    school: '',
    degree: '',
    field_of_study: '',
    start_date: '',
    end_date: '',
    grade: '',
    activities: '',
    description: '',
    media: '',
  }

  public show_interview_details: boolean = false;

  public audio_link: string = '';

  public audiopPlaylist: Track[] = [
    {
      title: '',
      link: '',
      artist: '',
      duration: 0
    },
  ];

  public decision_made = "";
  public option_selected: boolean = false;

  public interested_candidates: any = [];

  public subscriptionVacancy!: Subscription;


  constructor(
    private candidateService: CandidateService,
    @Inject(MAT_DIALOG_DATA) public datainfo: any,
    private dialogRef: MatDialogRef<ViewAppliedCandidateComponent>,
    private vacancyService: VacancyService,
    private notifier: NotifierService,
    private emailService: EmailService,
    private audioService: AudioService,
    private documentService: DocumentService,
    private sanitizer: DomSanitizer,
    private data: DataService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.initCandidate();
    this.getCandidate();
    this.checkOption();
    this.getCandidateAudio();
    this.getCandidateDocument();

    if (this.checkCandidateIfShortlisted() || this.checkCandidateInTraining() || this.checkCandidateIfRejected() || this.checkCandidateIfUnderReview() || this.checkCandidateIfAcceptedAfterInterview() || this.checkCandidateIfRejectedAfterInterview() || this.checkCandidateIfPutUnderReviewAfterInterview()) {
      this.option_selected = true;
    }

    this.subscriptionVacancy = this.data.currentVacancy.subscribe((vacancy: any) => this.interested_candidates = vacancy.interested_candidates);

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

  // get candidate by Id
  getCandidate() {
    const candidateId = this.datainfo.candidate_data.id
    this.candidateService.getCandidateById(candidateId).subscribe(returnedcandidate => {
      this.candidate = returnedcandidate;
      this.interviews = this.candidate.interview;

      // get interview details
      const targetIndex = returnedcandidate.interview.findIndex((f: any) => f.vacancy_id === this.datainfo.vacancy.id);

      this.interview_notes = this.interviews[targetIndex]?.interview_notes;
      this.interview_score = this.interviews[targetIndex]?.interview_score;

      if (this.interviews[targetIndex]?.interview_decision === "Accepted") {
        this.decision_made = "Accepted";
      }

      if (this.interviews[targetIndex]?.interview_decision === "Training") {
        this.decision_made = "Training";
      }

      if (this.interviews[targetIndex]?.interview_decision === "Rejected") {
        this.decision_made = "Rejected";
      }

      if (this.interviews[targetIndex]?.interview_decision === "Under Review") {
        this.decision_made = "Under Review";
      }
    })
  }

  shortlistCandidate() {

    // console.log(this.interview_time);
    const interview_timestamp = this.interview_date.getTime();
    const interview_date = new Date(interview_timestamp);
    const converted_date = interview_date.getDate() + "/" + (interview_date.getMonth() + 1) + "/" + interview_date.getFullYear();
    const vacancy = this.datainfo.vacancy;

    const shortlisted_date = new Date(Date.now()).getTime() / 1000;

    vacancy.shortlisted_candidates.push({ _id: this.datainfo.candidate_data.id, shortlisted_date: shortlisted_date, first_name: this.datainfo.candidate_data.first_name, middle_name: this.datainfo.candidate_data.middle_name, last_name: this.datainfo.candidate_data.last_name });
    vacancy.interested_candidates = vacancy.interested_candidates.filter((x: any) => x._id !== this.datainfo.candidate_data.id);

    // this.updatedInterestedCandidates(vacancy.interested_candidates)

    // syncronise vacancy date
    this.updatedVacancy(vacancy);

    this.vacancyService.updateVacancy(vacancy).subscribe(returned => {
      if (returned) {
        this.notifier.Notification("success", "candidate successfully shortlisted.");
        this.selected_option = true;

        // send email to candidate
        this.emailService.ShortlistedCandidateEmail(this.candidate.email, this.candidate.first_name, this.candidate.middle_name, this.candidate.last_name, this.datainfo.vacancy.name, this.interview_time, converted_date).then((result: any) => {
          this.notifier.Notification("success", "Shortlisting Email has been sent to candidate.");
        });

        this.dialogRef.close();
      } else {
        this.notifier.Notification("warning", "failed to shortlist.");
        this.selected_option = false;
      }
    })
  }

  RejectCandidate() {
    const vacancy = this.datainfo.vacancy;

    const rejected_date = new Date(Date.now()).getTime() / 1000;

    vacancy.rejected_candidates.push({ _id: this.datainfo.candidate_data.id, rejected_date: rejected_date, first_name: this.datainfo.candidate_data.first_name, middle_name: this.datainfo.candidate_data.middle_name, last_name: this.datainfo.candidate_data.last_name });
    vacancy.interested_candidates.filter((x: any) => x._id !== this.datainfo.candidate_data.id)
    vacancy.interested_candidates = vacancy.interested_candidates.filter((x: any) => x._id !== this.datainfo.candidate_data.id);

    // syncronise vacancy date
    this.updatedVacancy(vacancy)

    this.vacancyService.updateVacancy(vacancy).subscribe(returned => {
      if (returned) {
        this.notifier.Notification("success", "candidate successfully rejected.");
        this.selected_option = true;

        // send email to candidate
        this.emailService.RejectedApplicationEmail(this.candidate.first_name, this.candidate.middle_name, this.candidate.last_name, this.candidate.email, this.datainfo.vacancy.name).then((result: any) => {
          this.notifier.Notification("success", "Rejection Email has been sent to candidate.");
        });

        this.dialogRef.close();
      } else {
        this.notifier.Notification("warning", "failed to reject.");
        this.selected_option = false;
      }
    })
  }

  PutCandidateUnderReview() {
    const vacancy = this.datainfo.vacancy;

    const under_review_date = new Date(Date.now()).getTime() / 1000;

    vacancy.under_review_candidates.push({ _id: this.datainfo.candidate_data.id, under_review_date: under_review_date, first_name: this.datainfo.candidate_data.first_name, middle_name: this.datainfo.candidate_data.middle_name, last_name: this.datainfo.candidate_data.last_name });
    vacancy.interested_candidates.filter((x: any) => x._id !== this.datainfo.candidate_data.id)
    vacancy.interested_candidates = vacancy.interested_candidates.filter((x: any) => x._id !== this.datainfo.candidate_data.id);

    // syncronise vacancy date
    this.updatedVacancy(vacancy)

    this.vacancyService.updateVacancy(vacancy).subscribe(returned => {
      if (returned) {
        this.notifier.Notification("success", "candidate successfully put under review.");
        this.selected_option = true;

        this.dialogRef.close();
      } else {
        this.notifier.Notification("warning", "failed to put candidate under review.");
        this.selected_option = false;
      }
    })
  }

  updatedVacancy(vacancy: any) {
    this.data.changeVacancy(vacancy);
  }


  AcceptCandidateAfterInterview(candidate: any) {
    const dialogRef = this.dialog.open(VacancyEmailDialogComponent, {
      width: '70%',
      height: '85%',
      autoFocus: false,
      data: { candidate_data: candidate, vacancy_data: this.datainfo.vacancy },
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === 'sent') {
        this.AcceptingTheCandidateAfterInterview(candidate)
      }
    });
  }

  AcceptingTheCandidateAfterInterview(candidate: any) {

    const vacancy = this.datainfo.vacancy;

    const accept_date = new Date(Date.now()).getTime() / 1000;

    vacancy.accepted_candidates_after_interview.push({ _id: this.datainfo.candidate_data.id, accepted_date: accept_date, first_name: this.datainfo.candidate_data.first_name, middle_name: this.datainfo.candidate_data.middle_name, last_name: this.datainfo.candidate_data.last_name });

    // remove candidate from shorlisted
    vacancy.shortlisted_candidates = vacancy.shortlisted_candidates.filter((x: any) => x._id !== this.datainfo.candidate_data.id);

    // syncronise vacancy date
    this.updatedVacancy(vacancy)

    this.vacancyService.updateVacancy(vacancy).subscribe(returned => {
      const targetIndex = candidate.interview.findIndex((f: any) => f.vacancy_id === this.datainfo.vacancy.id);
      candidate.interview[targetIndex].interview_decision = "Accepted"

      this.candidateService.updateCandidate(candidate).subscribe(updatedCandidate => {
        this.candidate = updatedCandidate;
        this.decision_made = "Accepted";

        const start_timestamp = this.start_date.getTime();
        const start_date = new Date(start_timestamp)
        const converted_date = start_date.getDate() + "/" + (start_date.getMonth() + 1) + "/" + start_date.getFullYear();

        this.notifier.Notification("success", "candidate successfully accepted.");
      })
    })
  }

  TrainCandidateAfterInterview(candidate: any) {
    const dialogRef = this.dialog.open(VacancyEmailDialogComponent, {
      width: '70%',
      height: '85%',
      autoFocus: false,
      data: { candidate_data: candidate, vacancy_data: this.datainfo.vacancy },
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === 'sent') {
        this.TrainTheCandidateAfterInterview(candidate)
      }
    });
  }

  TrainTheCandidateAfterInterview(candidate: any) {

    const vacancy = this.datainfo.vacancy;

    const accept_date = new Date(Date.now()).getTime() / 1000;

    vacancy.intraining_candidates.push({ _id: this.datainfo.candidate_data.id, accepted_date: accept_date, first_name: this.datainfo.candidate_data.first_name, middle_name: this.datainfo.candidate_data.middle_name, last_name: this.datainfo.candidate_data.last_name });

    // remove candidate from shorlisted
    vacancy.shortlisted_candidates = vacancy.shortlisted_candidates.filter((x: any) => x._id !== this.datainfo.candidate_data.id);

    // syncronise vacancy date
    this.updatedVacancy(vacancy)

    this.vacancyService.updateVacancy(vacancy).subscribe(returned => {
      const targetIndex = candidate.interview.findIndex((f: any) => f.vacancy_id === this.datainfo.vacancy.id);
      candidate.interview[targetIndex].interview_decision = "Training"

      this.candidateService.updateCandidate(candidate).subscribe(updatedCandidate => {
        this.candidate = updatedCandidate;
        this.decision_made = "Training";

        const start_timestamp = this.start_date.getTime();
        const start_date = new Date(start_timestamp)
        const converted_date = start_date.getDate() + "/" + (start_date.getMonth() + 1) + "/" + start_date.getFullYear();

        this.notifier.Notification("success", "Updated Successfully.");
      })
    })
  }

  RejectCandidateAfterInterview(candidate: any) {

    const vacancy = this.datainfo.vacancy;

    const rejected_date = new Date(Date.now()).getTime() / 1000;
    vacancy.rejected_candidates_after_interview.push({ _id: this.datainfo.candidate_data.id, rejected_date: rejected_date, first_name: this.datainfo.candidate_data.first_name, middle_name: this.datainfo.candidate_data.middle_name, last_name: this.datainfo.candidate_data.last_name });

    // remove candidate from shorlisted
    vacancy.shortlisted_candidates = vacancy.shortlisted_candidates.filter((x: any) => x._id !== this.datainfo.candidate_data.id);

    // syncronise vacancy date
    this.updatedVacancy(vacancy)

    this.vacancyService.updateVacancy(vacancy).subscribe(returned => {
      const targetIndex = candidate.interview.findIndex((f: any) => f.vacancy_id === this.datainfo.vacancy.id);
      candidate.interview[targetIndex].interview_decision = "Rejected"

      this.candidateService.updateCandidate(candidate).subscribe(updatedCandidate => {
        this.candidate = updatedCandidate;
        this.decision_made = "Rejected";

        this.notifier.Notification("success", "candidate successfully rejected.");

        this.emailService.RejectedCandidateEmail(this.candidate.email).then((result: any) => {
          this.notifier.Notification("success", "Job rejection email has been sent to candidate.");
        });
      })
    })
  }

  PutCandidateUnderReviewAfterInterview(candidate: any) {

    const vacancy = this.datainfo.vacancy;

    const under_review_date = new Date(Date.now()).getTime() / 1000;

    vacancy.under_review_candidates_after_interview.push({ _id: this.datainfo.candidate_data.id, under_review_date: under_review_date, first_name: this.datainfo.candidate_data.first_name, middle_name: this.datainfo.candidate_data.middle_name, last_name: this.datainfo.candidate_data.last_name });

    // remove candidate from shorlisted
    vacancy.shortlisted_candidates = vacancy.shortlisted_candidates.filter((x: any) => x._id !== this.datainfo.candidate_data.id);

    // syncronise vacancy date
    this.updatedVacancy(vacancy)

    this.vacancyService.updateVacancy(vacancy).subscribe(returned => {
      const targetIndex = candidate.interview.findIndex((f: any) => f.vacancy_id === this.datainfo.vacancy.id);
      candidate.interview[targetIndex].interview_decision = "Under Review"

      this.candidateService.updateCandidate(candidate).subscribe(updatedCandidate => {
        this.candidate = updatedCandidate;
        this.decision_made = "Under Review";

        this.notifier.Notification("success", "candidate successfully put under review.");

      })
    })

  }

  CommunicationAfterInterview() {
    // send email to candidate
    this.emailService.CommunicationAfterInterviewEmail(this.candidate.first_name, this.candidate.middle_name, this.candidate.last_name, this.candidate.email).then((result: any) => {
      this.notifier.Notification("success", "Communication Email after Interview Email has been sent to candidate.");
    });
  }

  checkOption() {
    const vacancy = this.datainfo.vacancy;

    if (vacancy.shortlisted_candidates.includes(this.datainfo.candidate_data.id)) {
      this.shortlisted = true;
      this.selected_option = true;
    }

    if (vacancy.rejected_candidates.includes(this.datainfo.candidate_data.id)) {
      this.rejected = true;
      this.selected_option = true;
    }

    if (vacancy.under_review_candidates.includes(this.datainfo.candidate_data.id)) {
      this.under_review = true;
      this.selected_option = true;
    }
  }


  checkCandidateIfShortlisted() {
    return this.datainfo.vacancy.shortlisted_candidates.some((el: any) => {
      return el._id === this.datainfo.candidate_data.id;
    });
  }

  checkCandidateInTraining() {
    return this.datainfo.vacancy.intraining_candidates.some((el: any) => {
      return el._id === this.datainfo.candidate_data.id;
    });
  }

  checkCandidateIfRejected() {
    return this.datainfo.vacancy.rejected_candidates.some((el: any) => {
      return el._id === this.datainfo.candidate_data.id;
    });
  }

  checkCandidateIfUnderReview() {
    return this.datainfo.vacancy.under_review_candidates.some((el: any) => {
      return el._id === this.datainfo.candidate_data.id;
    });
  }

  checkCandidateIfAcceptedAfterInterview() {
    return this.datainfo.vacancy.accepted_candidates_after_interview.some((el: any) => {
      return el._id === this.datainfo.candidate_data.id;
    });
  }

  checkCandidateIfRejectedAfterInterview() {
    return this.datainfo.vacancy.rejected_candidates_after_interview.some((el: any) => {
      return el._id === this.datainfo.candidate_data.id;
    });
  }

  checkCandidateIfPutUnderReviewAfterInterview() {
    return this.datainfo.vacancy.under_review_candidates_after_interview.some((el: any) => {
      return el._id === this.datainfo.candidate_data.id;
    });
  }

  // get candidate audio
  getCandidateAudio() {

    if (this.datainfo.candidate_data.audio_id) {
      this.empty_audio = false;

      this.audioService.getAudioById(this.datainfo.candidate_data.audio_id).subscribe(returned_audio => {
        this.audio_base64 = returned_audio.audio;
        this.audio_name = returned_audio.audio_name;

        // coverting base64 string to file
        this.audioDataURLtoFile(this.audio_base64, this.audio_name);
      })
    } else {
      this.empty_audio = true;
    }
  }


  // get candidate document
  getCandidateDocument() {
    if (this.datainfo.candidate_data.documents.length > 0) {
      this.empty_document = false;
      this.candidate_resume = true;

      this.datainfo.candidate_data.documents.forEach((element: any) => {
        this.documentService.getDocumentById(element).subscribe(returned_doc => {
          this.document_base64 = returned_doc.document;
          this.document_name = returned_doc.document_name;

          // coverting base64 string to file
          this.documentDataURLtoFile(this.document_base64, this.document_name);
        })
      });

    } else {
      this.empty_document = true;
    }
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


  changeVacancy(event: any) {

    const index = event.value;
    this.my_index = index;

    this.interview_notes = this.interviews[index].interview_notes;
    this.interview_score = this.interviews[index].interview_score

    this.show_interview_page = true;
  }


  UpdateInterview(candidate: Candidate) {

    const targetIndex = candidate.interview.findIndex((f: any) => f.vacancy_id === this.datainfo.vacancy.id);

    this.interviews[targetIndex].interview_notes = this.interview_notes;
    this.interviews[targetIndex].interview_score = this.interview_score;

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




  ShowCandidateStartDetails() {
    this.starting_details = true;
  }

  // download document
  DownloadDocument() {
    const url = `${this.document_link}`;

    window.open(url, "_blank");
  }


  onEnded(event: any) {
    this.currentTrack = null;
  }

  ConfirmDetails() {
    this.show_interview_details = true;
    this.selected_option = true;
  }

  onChangeInterviewDate(event: any) {
    this.interview_date = event.value;
  }

  onChangeStartDate(event: any) {
    this.start_date = event.value;
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscriptionVacancy.unsubscribe();
  }
}
