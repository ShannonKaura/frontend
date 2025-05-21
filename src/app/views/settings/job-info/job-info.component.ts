import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { EditJobComponent } from '../edit-job/edit-job.component';
import { NewJobComponent } from '../new-job/new-job.component';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent implements OnInit {

  public jobDialogRef!: MatDialogRef<NewJobComponent>;
  public displayedColumns: string[] = ['job_name', 'action'];
  public dataSource!: MatTableDataSource<Job>;
  public selection = new SelectionModel<Job>(true, []);
  public dialogRef: MatDialogRef<any> | undefined;
  public job!: Job;
  public JobData: any = [];
  @ViewChild('job_paginator', { static: false }) job_paginator!: MatPaginator;
  public pageSizeOptions: number[] = [];
  public pageEvent!: PageEvent;
  public pageSize = 100;
  public loading: boolean = false;
  public jobsList = true;


  constructor(
    private dialog: MatDialog,
    private jobService: JobService,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.getJobs();
  }

  //create new job
  openNewJobDialog() {
    this.jobDialogRef = this.dialog.open(NewJobComponent, { width: '50%', maxHeight: '620px' });
    this.jobDialogRef.updatePosition({
      top: '4%',
    });

    this.jobDialogRef.afterClosed().subscribe(result => {
      this.getJobs();
    });
  }

  //get jobs from database
  getJobs() {

    this.loading = true;

    this.jobService.getAllJobs().subscribe(data => {
      this.JobData = data;

      if (this.JobData.length == 0) {
        this.loading = false;
        this.jobsList = false;
      } else {
        this.jobsList = true;
      }

      this.dataSource = new MatTableDataSource<Job>(this.JobData);
      setTimeout(() => {
        this.dataSource.paginator = this.job_paginator;
      }, 0);

      this.loading = false;

    })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  //deleting job
  deleteJob(index: number, e: any) {
    const data = this.dataSource.data;
    console.log('page index', this.job_paginator.pageIndex)
    data.splice((this.job_paginator.pageIndex * this.job_paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.jobService.deleteJob(e.id).subscribe()
  }


  //confirm to delete job
  confirmDialog(myindex: number, e: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "NB: This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteJob(myindex, e);
        this.notifier.Notification("success", "user successfully deleted.");
      }
    });
  }

  //update job
  openEditJob(selected: any): void {
    const dialogRef = this.dialog.open(EditJobComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getJobs();
    });
  }

}
