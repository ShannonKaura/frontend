import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate } from 'src/app/models/candidate';
import { DocumentService } from 'src/app/services/document.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { Document } from 'src/app/models/document';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material/core';
import { CandidateService } from 'src/app/services/candidate.service';
import { AudioService } from 'src/app/services/audio.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {

  public document!: Document;
  public ImageBaseData: any;
  public documentName: string = '';
  public documentType: string = '';
  public saved_document: any;
  public matcher = new MyErrorStateMatcher();
  public show_format_message: boolean = false;
  public show_max_message: boolean = false;
  public max_size_reached: boolean = false;
  public loading: boolean = false;

  public profile_completion = 0

  public documents: any;
  public empty_document: boolean = true;
  public candidate_document: any;
  public candidate_audio: boolean = false;
  public candidate_media: any;
  public audios: any;
  public percentDone: number = 0;
  public file_selected: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public candidatedatainfo: Candidate,
    private dialogRef: MatDialogRef<AddDocumentComponent>,
    private documentService: DocumentService,
    private notifier: NotifierService,
    private candidateService: CandidateService,
  ) { }

  ngOnInit(): void {
    this.initDocument();
  }

  initDocument() {
    this.document = {
      _id: '',
      document: '',
      candidate_id: this.candidatedatainfo._id,
      document_name: '',
      document_type: '',
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
      this.file_selected = true;
      // file size in MB
      const file_size = file.size / (1024 * 1024);

      if (file_size < max_size) {
        reader.readAsDataURL(file);


        if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {

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
          this.notifier.Notification("warning", "Could not save document , upload .pdf , .docx fomarts only");
        }
      }
      else {
        this.max_size_reached = true;
      }
    } else {
      this.file_selected = false;
    }
  }

  //Edit Document Intro
  AddDocument() {

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

    // audio
    if (this.candidatedatainfo.audio_id) {
      this.profile_completion += 15;
    }

    //add 15% for adding new document 
    this.profile_completion += 15;


    this.candidatedatainfo.profile_completion = this.profile_completion;

    // update candidate profile status rate
    this.candidateService.updateCandidate(this.candidatedatainfo).subscribe((returned: any) => {
      if (returned) {
        // add document
        this.loading = true;
        if (!this.show_format_message && !this.max_size_reached && this.ImageBaseData) {
          this.document.document = this.ImageBaseData;
          this.document.document_name = this.documentName;
          this.document.document_type = this.documentType;

          this.AddingDocument().then((returned: any) => {
            this.candidatedatainfo.documents.push(returned.id);

            // update candidate , adding audio id
            this.candidateService.updateCandidate(this.candidatedatainfo).subscribe(
              updatedCandidate => {
                this.dialogRef.close();
                this.notifier.Notification("success", "Document Successfully Added");
              }
            )
          })
        } else {
          this.loading = false;
          this.notifier.Notification("warning", "document field should not be empty");
        }
      }
    })
  }

  // adding the documnet
  AddingDocument() {
    const promise: any = new Promise((resolve, reject) => {
      return this.documentService.addDocument(this.document).subscribe((event: any) => {

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
            resolve(this.saved_document = event.body);
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

  getDocumentLocationCityMessage() {
    return 'City is required';
  }

  getDocumentLocationCountryMessage() {
    return 'Country is required';
  }

  getCompanyMessage() {
    return 'Company is required';
  }


}

