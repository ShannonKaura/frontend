import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Document } from 'src/app/models/document';
import { Candidate } from 'src/app/models/candidate';
import { DocumentService } from 'src/app/services/document.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { CandidateService } from 'src/app/services/candidate.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.scss']
})
export class EditDocumentComponent implements OnInit {

  public document!: Document;
  public form!: UntypedFormGroup;
  public percentDone: any = 0;
  public matcher = new MyErrorStateMatcher();
  public candidate_document: any;
  public documents: any;

  public ImageBaseData: any;
  public documentName: string = '';
  public documentType: string = '';
  public show_format_message: boolean = false;
  public max_size_reached: boolean = false;

  public loading: boolean = false;

  public candidate_basic_details: boolean = false;
  public candidate_professional_summary: boolean = false;
  public candidate_education: boolean = false;
  public candidate_skills: boolean = false;
  public candidate_resume: boolean = false;

  public profile_completion = 0

  public empty_document: boolean = true;


  constructor(
    @Inject(MAT_DIALOG_DATA) public candidatedatainfo: Candidate,
    private dialogRef: MatDialogRef<EditDocumentComponent>,
    private documentService: DocumentService,
    public fb: UntypedFormBuilder,
    private notifier: NotifierService,
    private candidateService: CandidateService,
  ) { }

  ngOnInit(): void {
    this.initDocument();
    this.getCandidateDocument();
  }

  initDocument() {
    this.document = {
      _id: '',
      document: new File([""], ""),
      candidate_id: this.candidatedatainfo._id,
      document_name: '',
      document_type: '',
      created_by: '',
      modified_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
      modified_date: new Date(Date.now()).getTime() / 1000,
    }

    this.form = this.fb.group(this.document);
  }

  getCandidateDocument() {
    const candidateId = this.candidatedatainfo._id;

    if (candidateId) {
      this.documentService.getAllDocuments().subscribe((documents: any) => {
        this.documents = documents;

        this.candidate_document = this.documents.filter((document: any) =>
          document.candidate_id === candidateId)
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

    } else {
      this.max_size_reached = true;
    }

  }

  //Edit Document Intro
  EditDocument() {
    this.loading = true;

    this.profile_completion = 0

    if (this.candidatedatainfo.first_name !== '' && this.candidatedatainfo.last_name !== '' && this.candidatedatainfo.country !== '' && this.candidatedatainfo.city !== '') {
      this.profile_completion += 20;
    }

    if (this.candidatedatainfo.summary !== '') {
      this.profile_completion += 20;
    }

    if (this.candidatedatainfo.education.length > 0) {
      this.profile_completion += 20;
    }

    if (this.candidatedatainfo.skills.length > 0) {
      this.profile_completion += 20;
    }

    //add 20% for adding new document 
    this.profile_completion += 20;

    this.candidatedatainfo.profile_completion = this.profile_completion;

    // update candidate profile status rate
    this.candidateService.updateCandidate(this.candidatedatainfo).subscribe(returned => {
      if (returned) {

        this.loading = true;

        if (!this.show_format_message && !this.max_size_reached) {
          console.log(this.candidate_document)
          this.candidate_document[0].document = this.ImageBaseData;

          this.documentService.updateDocument(this.candidate_document[0]).subscribe(returned => {
            this.candidate_document = returned;

            if (this.candidate_document) {
              this.dialogRef.close();
              this.notifier.Notification("success", "Banner Successfully Created");
              this.loading = false;
            } else {
              this.notifier.Notification("warning", "Could not update");
            }

          })
        }
      }
    })



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

