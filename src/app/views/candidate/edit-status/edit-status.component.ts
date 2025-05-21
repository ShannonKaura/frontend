import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate } from 'src/app/models/candidate';
import { StatusService } from 'src/app/services/status.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { Status } from 'src/app/models/status';
import { HttpEvent, HttpEventType } from '@angular/common/http';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-status',
  templateUrl: './edit-status.component.html',
  styleUrls: ['./edit-status.component.scss']
})
export class EditStatusComponent implements OnInit {

  public status!: Status;
  public form!: UntypedFormGroup;
  public percentDone: any = 0;
  public matcher = new MyErrorStateMatcher();
  public candidate_status: any;
  public statuses: any;
  public preview: any = null;


  constructor(
    @Inject(MAT_DIALOG_DATA) public candidatedatainfo: Candidate,
    private dialogRef: MatDialogRef<EditStatusComponent>,
    private statusService: StatusService,
    public fb: UntypedFormBuilder,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.initStatus();
    this.getCandidateStatus();
  }

  initStatus() {
    this.status = {
      _id: '',
      status: new File([""], ""),
      candidate_id: this.candidatedatainfo._id,
      created_by: '',
      modified_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
      modified_date: new Date(Date.now()).getTime() / 1000,
    }

    this.form = this.fb.group(this.status);
  }

  getCandidateStatus() {
    const candidateId = this.candidatedatainfo._id;

    if (candidateId) {
      this.statusService.getAllStatuses().subscribe((statuses: any) => {
        this.statuses = statuses.statuses;

        this.candidate_status = this.statuses.filter((status: any) =>
          status.candidate_id === candidateId)
      })
    }
  }

  // Image Preview
  uploadFile(event: any) {
    const file = event.target.files[0];

    this.form.patchValue({
      status: file
    });

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  //Edit Status Intro
  EditStatus() {
    this.form.value.candidate_id = this.candidate_status[0].candidate_id,
      this.form.value.created_by = this.candidate_status[0].created_by,
      this.form.value.modified_by = this.status.modified_by,
      this.form.value.created_date = this.candidate_status[0].created_date,
      this.form.value.modified_date = this.status.modified_date

    this.statusService.updateStatus(this.form.value, this.candidate_status[0]._id).subscribe((event: HttpEvent<any> | any) => {
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
          console.log('Status successfully updated!', event.body);
          this.percentDone = false;
          this.notifier.Notification("success", "Profile Successfully Updated");
          this.dialogRef.close();
      }
    })
  }

  close() {
    this.dialogRef.close();
  }

  getTitleMessage() {
    return 'Job title is required';
  }

  getStatusLocationCityMessage() {
    return 'City is required';
  }

  getStatusLocationCountryMessage() {
    return 'Country is required';
  }

  getCompanyMessage() {
    return 'Company is required';
  }

}

