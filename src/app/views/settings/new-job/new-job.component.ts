import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.scss']
})
export class NewJobComponent implements OnInit {

  public job!: Job;
  public onJobCreation = new EventEmitter();
  public maxDate: Date = new Date();
  public hide = true;

  constructor(
    private jobService: JobService,
    private dialogRef: MatDialogRef<NewJobComponent>,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.initJob();
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

  // add job to database
  addJob(job: Job) {
    this.jobService.addJob(job).subscribe(createdJob => {
      this.onJobCreation.emit(job);

      if (createdJob) {
        this.notifier.Notification("success", "new job successfully saved.");
        this.close()
      } else {
        this.notifier.Notification("warning", "failed to save.");
      }
    })
  }

  close() {
    this.dialogRef.close();
  }

}
