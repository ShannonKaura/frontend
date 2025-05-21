import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Track } from 'ngx-audio-player';
import { CandidateAudio } from 'src/app/models/audio';
import { Candidate } from 'src/app/models/candidate';
import { AudioService } from 'src/app/services/audio.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { DocumentService } from 'src/app/services/document.service';
import { NotifierService } from 'src/app/services/notifier.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']
})
export class AddMediaComponent implements OnInit {

  public durationText: any;

  progress: number = 0;
  public audio!: CandidateAudio;
  public form!: UntypedFormGroup;
  public percentDone: any = 0;
  public matcher = new MyErrorStateMatcher();
  public preview!: string;
  public show_format_message: boolean = false;
  public show_max_message: boolean = false;
  public max_size_reached: boolean = false;

  public ImageBaseData: any;
  public documentName: string = '';
  public documentType: string = '';
  public saved_audio: any;

  public loading: boolean = false;

  public profile_completion: number = 0;

  public file_selected: boolean = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public candidatedatainfo: Candidate,
    private dialogRef: MatDialogRef<AddMediaComponent>,
    private audioService: AudioService,
    public fb: UntypedFormBuilder,
    private notifier: NotifierService,
    private candidateService: CandidateService,
  ) { }

  ngOnInit(): void {
    this.initMedia();
  }

  initMedia() {
    this.audio = {
      _id: '',
      audio: '',
      audio_name: '',
      audio_type: '',
      candidate_id: this.candidatedatainfo._id,
      created_by: '',
      modified_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
      modified_date: new Date(Date.now()).getTime() / 1000,
    }
  }

  // upload file as base 64
  handleFileInput(files: any) {

    const max_size = 2 //MB
    const me = this;
    const file = files.target.files[0];
    const reader = new FileReader();

    if (files.target.files[0]) {
      // get audio duration
      const audio = new Audio();
      audio.src = URL.createObjectURL(files.target.files[0]);
      audio.onloadedmetadata = () => {
        this.durationText = audio.duration.toFixed();

        this.file_selected = true;
        const file_size = file.size / (1024 * 1024);

        if (this.durationText <= 60) {
          reader.readAsDataURL(file);

          if (file.type === "audio/mpeg" || file.type === "video/mp4" || file.type === "audio/x-m4a" || file.type === "audio/ogg") {

            this.show_format_message = false;
            this.max_size_reached = false;

            reader.onload = function () {
              me.ImageBaseData = reader.result;
              me.documentName = file.name;
              me.documentType = file.type;
            };
            reader.onerror = function (error) {
              console.log('Error: ', error);
            };
          } else {
            this.show_format_message = true;
            this.notifier.Notification("warning", "Could not save audio , .mp3 , .mp4 , .m4a , .ogg fomarts only");
          }
        }
        else {
          this.max_size_reached = true;
        }

      };
    } else {
      this.file_selected = false;
    }


  }

  //Edit Audio Intro
  AddMedia() {

    this.profile_completion = 0

    // basic details
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

    // skills
    if (this.candidatedatainfo.skills.length > 0) {
      this.profile_completion += 14;
    }

    // resume
    if (this.candidatedatainfo.documents.length > 0) {
      this.profile_completion += 15;
    }

    //add 14% for adding new audio 
    this.profile_completion += 15;

    this.candidatedatainfo.profile_completion = this.profile_completion;

    this.loading = true;
    if (!this.show_format_message && !this.max_size_reached && this.ImageBaseData) {
      this.audio.audio = this.ImageBaseData;
      this.audio.audio_name = this.documentName;
      this.audio.audio_type = this.documentType;

      this.AddingAudio().then((returned: any) => {
        this.candidatedatainfo.audio_id = returned.id;

        // update candidate , adding audio id
        this.candidateService.updateCandidate(this.candidatedatainfo).subscribe(updatedCandidate => {
          this.dialogRef.close();
          this.notifier.Notification("success", "Audio Successfully Added");
        })
      })
    } else {
      this.loading = false;
      this.notifier.Notification("warning", "could not save audio");
    }
  }

  //adding the audio
  AddingAudio1() {
    const promise: any = new Promise((resolve, reject) => {
      return this.audioService.addAudio(this.audio).toPromise().then(returned => {
        resolve(this.saved_audio = returned);

      }, msg => {
        reject(msg)
      });
    });
    return promise;
  }

  AddingAudio() {
    const promise: any = new Promise((resolve, reject) => {
      return this.audioService.addAudio(this.audio).subscribe((event: any) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.percentDone = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.percentDone}%`);
            break;
          case HttpEventType.Response:
            console.log('Audio successfully created!', event.body);
            resolve(this.saved_audio = event.body);
        }
      }, msg => {
        reject(msg)
      });
    });
    return promise;
  }

  close() {
    this.dialogRef.close();
  }

  getTitleMessage() {
    return 'Job title is required';
  }

  getMediaLocationCityMessage() {
    return 'City is required';
  }

  getMediaLocationCountryMessage() {
    return 'Country is required';
  }

  getCompanyMessage() {
    return 'Company is required';
  }

}
