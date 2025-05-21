
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CandidateAudio } from 'src/app/models/audio';
import { Candidate } from 'src/app/models/candidate';
import { AudioService } from 'src/app/services/audio.service';
import { NotifierService } from 'src/app/services/notifier.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-media',
  templateUrl: './edit-media.component.html',
  styleUrls: ['./edit-media.component.scss']
})
export class EditMediaComponent implements OnInit {

  public audio!: CandidateAudio;
  public form!: UntypedFormGroup;
  public percentDone: any = 0;
  public matcher = new MyErrorStateMatcher();
  public candidate_audio: any;
  public audios: any;

  public ImageBaseData: any;
  public audioName: string = '';
  public audioType: string = '';

  public show_format_message: boolean = false;
  public show_max_message: boolean = false;
  public max_size_reached: boolean = false;

  public loading: boolean = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public candidatedatainfo: Candidate,
    private dialogRef: MatDialogRef<EditMediaComponent>,
    private audioService: AudioService,
    public fb: UntypedFormBuilder,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.initMedia();
    this.getCandidateAudio();
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

    this.form = this.fb.group(this.audio);
  }

  getCandidateAudio() {
    const candidateId = this.candidatedatainfo._id;

    if (candidateId) {
      this.audioService.getAllAudios().subscribe((audios: any) => {
        this.audios = audios;

        this.candidate_audio = this.audios.filter((audio: any) =>
          audio.candidate_id === candidateId)
      })
    }
  }

  // upload file as base 64
  handleFileInput(files: any) {

    const max_size = 7 //MB
    const me = this;
    const file = files.target.files[0];
    const reader = new FileReader();

    // file size in MB
    const file_size = file.size / (1024 * 1024)

    if (file_size < max_size) {

      reader.readAsDataURL(file);

      if (file.type === "audio/mpeg" || file.type === "video/mp4" || file.type === "audio/x-m4a" || file.type === "audio/ogg") {

        this.show_format_message = false;
        this.max_size_reached = false;

        reader.onload = function () {
          me.ImageBaseData = reader.result;
          me.audioName = file.name;
          me.audioType = file.type;
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };

      } else {
        this.show_format_message = true;
        this.notifier.Notification("warning", "Could not save document , .mp3 , .mp4 , .m4a , .ogg fomarts only");
      }

    } else {
      this.max_size_reached = true;
    }

  }

  //Edit Audio Intro
  EditMedia() {
    this.loading = true;
    if (!this.show_format_message && !this.max_size_reached) {

      console.log('xxxxx', this.candidate_audio)

      this.candidate_audio[0].audio = this.ImageBaseData;
      this.candidate_audio[0].audio_name = this.audioName;
      this.candidate_audio[0].audio_type = this.audioType;

      this.audioService.updateAudio(this.candidate_audio[0]).subscribe(returned => {
        this.candidate_audio = returned;

        if (this.candidate_audio) {
          this.dialogRef.close();
          this.notifier.Notification("success", "Audio Successfully Updated");
          this.loading = false;
        } else {
          this.notifier.Notification("warning", "Could not update");
        }

      })
    }
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
