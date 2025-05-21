import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroupDirective, NgForm, UntypedFormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateAudio } from 'src/app/models/audio';
import { Candidate } from 'src/app/models/candidate';
import { CandidateNoProfile } from 'src/app/models/canidate-no-profile';
import { Document } from 'src/app/models/document';
import { AudioService } from 'src/app/services/audio.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { DocumentService } from 'src/app/services/document.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { VacancyService } from 'src/app/services/vacancy.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-guest-profile',
  templateUrl: './guest-profile.component.html',
  styleUrls: ['./guest-profile.component.scss']
})
export class GuestProfileComponent implements OnInit {

  public durationText: any;
  public audio_selected: boolean = false;
  public show_audio_format_message: boolean = false;
  public show_audio_max_message: boolean = false;
  public audio_max_size_reached: boolean = false;
  public candidateNoProfile!: CandidateNoProfile;
  public candidate!: Candidate;
  public document!: Document;
  public audio!: CandidateAudio;
  public document_selected: boolean = false;
  public show_document_format_message: boolean = false;
  public document_max_size_reached: boolean = false;
  public DocumentBaseData: any;
  public AudioBaseData: any;
  public documentName: string = '';
  public audioName: string = '';
  public documentType: string = '';
  public audioType: string = '';
  public saved_document: any;
  public saved_audio: any;
  public document_loading: boolean = false;
  public documentPercentDone: number = 0;
  public document_matcher = new MyErrorStateMatcher();

  public audio_loading: boolean = false;
  public audioPercentDone: number = 0;
  public audio_matcher = new MyErrorStateMatcher();

  public vacancy: any = {};

  constructor(
    private candidateService: CandidateService,
    private route: ActivatedRoute,
    private audioService: AudioService,
    private documentService: DocumentService,
    private router: Router,
    private vacancyService: VacancyService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {

    this.initCandidate();

    this.candidateNoProfile = {
      _id: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      phone: '',
      interview: [],
      created_date: new Date(Date.now()).getTime() / 1000,
    }

    this.document = {
      _id: '',
      document: '',
      candidate_id: '',
      document_name: '',
      document_type: '',
      created_by: '',
      modified_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
      modified_date: new Date(Date.now()).getTime() / 1000,
    }

    this.audio = {
      _id: '',
      audio: '',
      audio_name: '',
      audio_type: '',
      candidate_id: '',
      created_by: '',
      modified_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
      modified_date: new Date(Date.now()).getTime() / 1000,
    }

    // subscribe to the current job vacancy

    this.getVacancy(this.route.snapshot.paramMap.get('vacancy_id'));
  }

  // init candidate
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

  getVacancy(vacancy_id: string | any) {
    // get vacancy
    this.vacancyService.getVacancyById(vacancy_id).subscribe(returned => {
      this.vacancy = returned;
    })
  }

  ApplicationProcess(current_candidate: any) {

    let application_date = new Date(Date.now()).getTime() / 1000;

    this.vacancy.interested_candidates.push({
      _id: current_candidate.id,
      application_date: application_date,
      first_name: current_candidate.first_name,
      middle_name: current_candidate.middle_name,
      last_name: current_candidate.last_name
    });

    this.vacancyService.updateVacancy(this.vacancy).subscribe(() => { });

    let interview_info = {
      vacancy_id: this.vacancy.id,
      vacancy_name: this.vacancy.name,
      vacancy_created_date: new Date(Date.now()).getTime() / 1000,
      interview_notes: '',
      interview_score: ''
    }

    current_candidate.interview.push(interview_info);
    // update candidate
    this.candidateService.updateCandidate(current_candidate).subscribe(updated => {
      this.notifier.Notification("success", "Application successful");
    })
  }

  getAge(date: any) {
    var today = new Date();
    var birthDate = new Date(date);
    var age = (today.getFullYear() - birthDate.getFullYear());
    var m = (today.getMonth() - birthDate.getMonth());
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // upload file as base 64
  handleDocumentFileInput(files: any) {

    const max_size = 2 //MB
    const me = this;
    const file = files.target.files[0];
    const reader = new FileReader();

    if (files.target.files[0]) {
      this.document_selected = true;
      // file size in MB
      const file_size = file.size / (1024 * 1024);

      if (file_size < max_size) {
        reader.readAsDataURL(file);


        if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {

          this.show_document_format_message = false;
          this.document_max_size_reached = false;

          reader.onload = function () {
            me.DocumentBaseData = reader.result;
            me.documentName = file.name;
            me.documentType = file.type;

          };
          reader.onerror = function (error) {
            console.log('Error: ', error);
          };
        } else {
          this.show_document_format_message = true;
          this.notifier.Notification("warning", "Could not save document , upload .pdf , .docx fomarts only");
        }
      }
      else {
        this.document_max_size_reached = true;
      }
    } else {
      this.document_selected = false;
      this.notifier.Notification("warning", "Upload your CV");
    }
  }

  AddingDocument() {
    this.documentService.addDocument(this.document).subscribe((event: any) => {

      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.documentPercentDone = Math.round(event.loaded / event.total * 100);
          // console.log(`Uploaded! ${this.documentPercentDone}%`);
          break;
        case HttpEventType.Response:
          // console.log('Document successfully created!', event.body);
          this.saved_document = event.body;
      }
    });
  }

  //Edit Document Intro
  AddDocument(candidate_id: any) {

    // add document
    this.document_loading = true;

    if (!this.show_document_format_message && !this.document_max_size_reached && this.DocumentBaseData) {
      this.document.document = this.DocumentBaseData;
      this.document.document_name = this.documentName;
      this.document.document_type = this.documentType;
      this.document.candidate_id = candidate_id;

      this.AddingDocument();

    } else {
      this.document_loading = false;
      this.notifier.Notification("warning", "document field should not be empty");
    }
  }

  // upload file as base 64
  handleAudioFileInput(files: any) {

    const me = this;
    const file = files.target.files[0];
    const reader = new FileReader();

    if (files.target.files[0]) {
      // get audio duration
      const audio = new Audio();
      audio.src = URL.createObjectURL(files.target.files[0]);
      audio.onloadedmetadata = () => {
        this.durationText = audio.duration.toFixed();

        this.audio_selected = true;
        const file_size = file.size / (1024 * 1024);

        if (this.durationText <= 60) {
          reader.readAsDataURL(file);

          if (file.type === "audio/mpeg" || file.type === "video/mp4" || file.type === "audio/x-m4a" || file.type === "audio/ogg") {

            this.show_audio_format_message = false;
            this.audio_max_size_reached = false;

            reader.onload = function () {
              me.AudioBaseData = reader.result;
              me.audioName = file.name;
              me.audioType = file.type;
            };
            reader.onerror = function (error) {
              console.log('Error: ', error);
            };
          } else {
            this.show_audio_format_message = true;
            this.notifier.Notification("warning", "Could not save audio , .mp3 , .mp4 , .m4a , .ogg fomarts only");
          }
        }
        else {
          this.audio_max_size_reached = true;
        }
      }
    } else {
      this.audio_selected = false;
      this.notifier.Notification("warning", "Upload an audio");
    }


  }


  //Edit Audio Intro
  AddMedia(candidate_id: any) {
    this.audio_loading = true;
    if (!this.show_audio_format_message && !this.audio_max_size_reached && this.AudioBaseData) {
      this.audio.audio = this.AudioBaseData;
      this.audio.audio_name = this.audioName;
      this.audio.audio_type = this.audioType;
      this.audio.candidate_id = candidate_id;

      this.AddingAudio();
    }
  }

  AddingAudio() {
    this.audioService.addAudio(this.audio).subscribe((event: any) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.audioPercentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.audioPercentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('Audio successfully created!', event.body);
          this.saved_audio = event.body;
      }
    })
  }


  saveCandidate(candidate: any) {

    this.candidate.first_name = candidate.first_name;
    this.candidate.last_name = candidate.last_name;
    this.candidate.middle_name = candidate.middle_name;
    this.candidate.email = candidate.email;
    this.candidate.phone = candidate.phone;


    // check if candidate exists
    this.candidateService.getCandidateByEmail(this.candidate.email).subscribe((returned: any) => {

      // if candidate exists - update password
      if (returned[0]) {

        // check if application exists
        let isFound = this.vacancy.interested_candidates.some((element: any) => {
          if (element._id === returned[0].id) {
            return true;
          }
          return false;
        });


        if (!isFound) {

          this.ApplicationProcess(returned[0]);

          const url = `/create-password/${returned[0]._id}`;
          this.router.navigate([url]);
        } else {

          // first delete application if it exists
          const indexOfObject = this.vacancy.interested_candidates.findIndex((object: any) => {
            return object._id === returned[0]._id;
          });

          // delete it if it exists
          this.vacancy.interested_candidates.splice(indexOfObject, 1);

          // then re-apply
          this.ApplicationProcess(returned[0]);

          const url = `/create-password/${returned[0]._id}`;
          this.router.navigate([url]);
        }

      } else {
        // if candidate does not exist - save candidate
        if (this.audio_selected && this.document_selected) {
          this.candidateService.addCandidate(this.candidate).subscribe((returned_candidate: any) => {
            this.AddDocument(returned_candidate._id);
            this.AddMedia(returned_candidate._id);

            this.ApplicationProcess(returned_candidate);

            const url = `/create-password/${returned_candidate.id}`;
            this.router.navigate([url]);
          })
        } else {
          this.notifier.Notification("warning", "Upload your CV or Audio");
        }
      }
    })
  }

  getFirstNameMessage() {
    return 'First name is required';
  }

  getMiddleNameMessage() {
    return 'Middle name is required';
  }

  getLastNameMessage() {
    return 'Lastname is required'
  }

  getCountryMessage() {
    return 'Country is required';
  }

  getEmailMessage() {
    return 'Email is required';
  }

  getCityMessage() {
    return 'City is required';
  }

  getPhoneMessage() {
    return 'Phone number is required';
  }

}
