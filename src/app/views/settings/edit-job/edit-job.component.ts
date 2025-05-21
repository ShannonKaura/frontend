import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {

  public job!: Job;
  public maxDate: Date = new Date();
  public hide = true;

  constructor(
    private jobService: JobService,
    @Inject(MAT_DIALOG_DATA) public jobdatainfo: any,
    private dialogRef: MatDialogRef<EditJobComponent>,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.initJob();
    this.getJob();
  }

  // initialize job model
  initJob() {
    this.job = {
      _id: '',
      job_name: '',
      created_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
    }
  }

  // get job by Id
  getJob() {
    const jobId = this.jobdatainfo.id
    if (jobId) {
      this.jobService.getJobById(jobId).subscribe(returnedjob => {
        this.job = returnedjob;
      })
    }
  }

  //update job
  updateJob(job: Job) {
    this.jobService.updateJob(job).subscribe(updatedJob => {
      this.job = updatedJob;

      if (this.job) {
        this.notifier.Notification("success", "job successfully updated.");
        this.dialogRef.close();
      } else {
        this.notifier.Notification("warning", "failed to save.");
      }
    })
  }

  close() {
    this.dialogRef.close();
  }
}
