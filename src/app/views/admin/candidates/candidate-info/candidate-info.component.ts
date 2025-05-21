import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { NewCandidateComponent } from '../new-candidate/new-candidate.component';
import { ViewCandidateComponent } from '../view-candidate/view-candidate.component';
import { RoleChangeDialogComponent } from '../role-change-dialog/role-change-dialog.component';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-candidate-info',
  templateUrl: './candidate-info.component.html',
  styleUrls: ['./candidate-info.component.scss'],
})
export class CandidateInfoComponent implements OnInit {

  public loading: boolean = false;

  public candidateDialogRef: MatDialogRef<NewCandidateComponent> | any;
  public roleChangeDialogRef: MatDialogRef<RoleChangeDialogComponent> | any;
  public profileSourceCandidates: MatTableDataSource<Candidate> | any;
  public completeProfileSourceCandidates: MatTableDataSource<Candidate> | any;
  public incompleteProfileSourceCandidates: MatTableDataSource<Candidate> | any;
  public accepetedCandidatesSource: MatTableDataSource<Candidate> | any;
  public intrainingCandidatesSource: MatTableDataSource<Candidate> | any;

  public selection = new SelectionModel<Candidate>(true, []);
  public dialogRef: MatDialogRef<any> | undefined;
  public candidate!: Candidate;
  public CandidateData: any = [];


  @ViewChild('profile_candidate_paginator', { static: false }) profile_candidate_paginator!: MatPaginator;
  @ViewChild('complete_profile_candidate_paginator', { static: false }) complete_profile_candidate_paginator!: MatPaginator;
  @ViewChild('incomplete_profile_candidate_paginator', { static: false }) incomplete_profile_candidate_paginator!: MatPaginator;
  @ViewChild('accepted_candidate_paginator', { static: false }) accepted_candidate_paginator!: MatPaginator;
  @ViewChild('intraining_candidate_paginator', { static: false }) intraining_candidate_paginator!: MatPaginator;


  public profileDisplayedColumns: string[] = ['candidate_name', 'email', 'applied_date', 'is_staff', 'action'];
  public completeProfileDisplayedColumns: string[] = ['candidate_name', 'location', 'email', 'applied_date', 'is_staff', 'action'];
  public incompleteProfileDisplayedColumns: string[] = ['candidate_name', 'location', 'email', 'applied_date', 'is_staff', 'action'];
  public acceptedCandidateDisplayedColumns: string[] = ['candidate_name', 'location', 'email', 'applied_date', 'is_staff', 'action'];
  public pageEvent!: PageEvent;
  public pageSize = 100;
  public candidates_empty = true;
  public profileCandidates: any = [];
  public completedProfileCandidates: any = [];
  public incompletedProfileCandidates: any = [];
  public acceptedCandidates: any = [];
  public intrainingCandidates: any = [];

  @Input() completeProfileCandidate!: string;
  @Input() incompleteProfileCandidate!: string;
  @Input() acceptedCandidate!: string;
  @Input() intrainingCandidate!: string;
  @Input() profileCandidate!: string;
  @Input() shortlistedCandidate!: string;


  public subscriptionCandidates!: Subscription;
  public no_filtered_complete_profiles: boolean = false;
  public no_filtered_accepted_profiles: boolean = false;
  public no_filtered_incomplete_profiles: boolean = false;
  public no_filtered_profiles = false;


  constructor(
    private dialog: MatDialog,
    private candidateService: CandidateService,
    private router: Router,
    private notifier: NotifierService,
    private data: DataService,
  ) { }

  ngOnInit(): void {
    this.getCandidates();

    this.subscriptionCandidates = this.data.currentCandidatesList.subscribe((candidates: any) => {
      this.CandidateData = candidates;

      // get candidates
      this.profileCandidates = this.CandidateData.filter((element: any) => {
        return !element.employment_status && !element.staff;
      })

      // get accepted candidates
      this.acceptedCandidates = this.CandidateData.filter((element: any) => {
        return element.staff === true;
      })

      // get candidates in training
      this.intrainingCandidates = this.CandidateData.filter((element: any) => {
        return element.employment_status === "Training";
      })

      this.profileSourceCandidates = new MatTableDataSource<Candidate>(this.profileCandidates);
      this.completeProfileSourceCandidates = new MatTableDataSource<Candidate>(this.completedProfileCandidates);
      this.incompleteProfileSourceCandidates = new MatTableDataSource<Candidate>(this.incompletedProfileCandidates);
      this.accepetedCandidatesSource = new MatTableDataSource<Candidate>(this.acceptedCandidates);
      this.intrainingCandidatesSource = new MatTableDataSource<Candidate>(this.intrainingCandidates);
    })
  }

  //create new candidate
  openNewCandidateDialog() {
    this.candidateDialogRef = this.dialog.open(NewCandidateComponent, { width: '65%', height: '85%', maxHeight: '85%' });

    this.candidateDialogRef.updatePosition({
      top: '4%',
    });

    this.candidateDialogRef.afterClosed().subscribe((returned: any) => {

    })
  }

  getCandidates() {
    this.loading = true;
    this.candidateService.getAllCandidates().subscribe(data => {
      this.CandidateData = data;

      if (this.CandidateData.length > 0) {
        this.candidates_empty = false;

        // get candidates
        this.profileCandidates = this.CandidateData.filter((element: any) => {
          return !element.employment_status && !element.staff;
        })

        // get complete profile candidates
        this.completedProfileCandidates = this.CandidateData.filter((element: any) => {
          return element.profile_completion === 100 && !element.staff;
        })

        // get incomplete profile candidates
        this.incompletedProfileCandidates = this.CandidateData.filter((element: any) => {
          return element.profile_completion < 100 && !element.staff;
        })

        // get accepted candidates
        this.acceptedCandidates = this.CandidateData.filter((element: any) => {
          return element.staff === true;
        })

        // get candidates in training
        this.intrainingCandidates = this.CandidateData.filter((element: any) => {
          return element.training === true;
        })

        this.profileSourceCandidates = new MatTableDataSource<Candidate>(this.profileCandidates);
        this.completeProfileSourceCandidates = new MatTableDataSource<Candidate>(this.completedProfileCandidates);
        this.incompleteProfileSourceCandidates = new MatTableDataSource<Candidate>(this.incompletedProfileCandidates);
        this.accepetedCandidatesSource = new MatTableDataSource<Candidate>(this.acceptedCandidates);
        this.intrainingCandidatesSource = new MatTableDataSource<Candidate>(this.intrainingCandidates);

        setTimeout(() => {
          this.profileSourceCandidates.paginator = this.profile_candidate_paginator;
          this.completeProfileSourceCandidates.paginator = this.complete_profile_candidate_paginator;
          this.incompleteProfileSourceCandidates.paginator = this.incomplete_profile_candidate_paginator;
          this.accepetedCandidatesSource.paginator = this.accepted_candidate_paginator;
          this.intrainingCandidatesSource.paginator = this.intraining_candidate_paginator;

          this.loading = false;
        }, 0);
      } else {
        this.loading = false;
        this.candidates_empty = true;
      }

    })
  }


  public applyFilterProfileCandidates(filterValue: any) {
    this.profileSourceCandidates.filter = filterValue.target.value.trim().toLowerCase();
    this.profileSourceCandidates?.paginator?.firstPage();

    if (this.profileSourceCandidates.filteredData.length === 0) {
      this.no_filtered_profiles = true;
    } else {
      this.no_filtered_profiles = false;
    }
  }

  public applyFilterCandidatesInTraining(filterValue: any) {
    this.incompleteProfileSourceCandidates.filter = filterValue.target.value.trim().toLowerCase();
    this.incompleteProfileSourceCandidates.paginator.firstPage();

    if (this.incompleteProfileSourceCandidates.filteredData.length === 0) {
      this.no_filtered_incomplete_profiles = true;
    } else {
      this.no_filtered_incomplete_profiles = false;
    }
  }

  public applyFilterAcceptedCandidates(filterValue: any) {
    this.accepetedCandidatesSource.filter = filterValue.target.value.trim().toLowerCase();
    this.accepetedCandidatesSource.paginator.firstPage();

    if (this.accepetedCandidatesSource.filteredData.length === 0) {
      this.no_filtered_accepted_profiles = true;
    } else {
      this.no_filtered_accepted_profiles = false;
    }
  }

  public applyFilterInTrainingCandidates(filterValue: any) {
    this.intrainingCandidatesSource.filter = filterValue.target.value.trim().toLowerCase();
    this.intrainingCandidatesSource.paginator.firstPage();

    if (this.intrainingCandidatesSource.filteredData.length === 0) {
      this.no_filtered_accepted_profiles = true;
    } else {
      this.no_filtered_accepted_profiles = false;
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.completeProfileSourceCandidates.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.completeProfileSourceCandidates.data.forEach((row: any) => this.selection.select(row));
  }

  //deleting candidate
  deleteProfileCandidate(index: number, e: any) {
    const data = this.profileSourceCandidates.data;
    data.splice((this.profile_candidate_paginator.pageIndex * this.profile_candidate_paginator.pageSize) + index, 1);
    this.profileSourceCandidates.data = data;
    this.candidateService.deleteCandidate(e.id).subscribe()
  }

  deleteCompleteCandidate(index: number, e: any) {
    const data = this.completeProfileSourceCandidates.data;
    data.splice((this.complete_profile_candidate_paginator.pageIndex * this.complete_profile_candidate_paginator.pageSize) + index, 1);
    this.completeProfileSourceCandidates.data = data;
    this.candidateService.deleteCandidate(e.id).subscribe()
  }

  deleteOtherCandidate(index: number, e: any) {
    const data = this.incompleteProfileSourceCandidates.data;
    data.splice((this.incomplete_profile_candidate_paginator.pageIndex * this.incomplete_profile_candidate_paginator.pageSize) + index, 1);
    this.incompleteProfileSourceCandidates.data = data;
    this.candidateService.deleteCandidate(e.id).subscribe()
  }

  deleteAcceptedCandidate(index: number, e: any) {
    const data = this.accepetedCandidatesSource.data;
    data.splice((this.accepted_candidate_paginator.pageIndex * this.accepted_candidate_paginator.pageSize) + index, 1);
    this.accepetedCandidatesSource.data = data;
    this.candidateService.deleteCandidate(e.id).subscribe()
  }

  deleteInTrainingCandidate(index: number, e: any) {
    const data = this.intrainingCandidatesSource.data;
    data.splice((this.intraining_candidate_paginator.pageIndex * this.intraining_candidate_paginator.pageSize) + index, 1);
    this.intrainingCandidatesSource.data = data;
    this.candidateService.deleteCandidate(e.id).subscribe()
  }

  confirmDialogProfile(myindex: number, e: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "Are you sure, This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProfileCandidate(myindex, e);
        this.notifier.Notification("success", "candidate successfully deleted");
      } else {
        this.notifier.Notification("warning", "could not delete candidate");
      }
    });
  }

  //confirm to delete candidate
  confirmDialogCompleteProfile(myindex: number, e: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "Are you sure, This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCompleteCandidate(myindex, e);
        this.notifier.Notification("success", "candidate successfully deleted");
      } else {
        this.notifier.Notification("warning", "could not delete candidate");
      }
    });
  }


  confirmDialogOtherProfile(myindex: number, e: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "Are you sure, This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteOtherCandidate(myindex, e);
        this.notifier.Notification("success", "candidate successfully deleted");
      } else {
        this.notifier.Notification("warning", "could not delete candidate");
      }
    });
  }

  confirmDialogAcceptedProfile(myindex: number, e: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "Are you sure, This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAcceptedCandidate(myindex, e);
        this.notifier.Notification("success", "candidate successfully deleted");
      } else {
        this.notifier.Notification("warning", "could not delete candidate");
      }
    });
  }


  public editCandidate(selected: any) {

    var myurl = `candidate/${selected._id}`;

    this.router.navigateByUrl(myurl).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

  //view client
  openViewCandidate(selected: any): void {
    const dialogRef = this.dialog.open(ViewCandidateComponent, {
      width: '70%',
      height: '80%',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });
  }

  // toggle if staff member
  toggleUser(result: any, selected: any) {
    console.log('result', result);
    console.log('selected candidate', selected);

    const role = {
      job_name: '',
      id: ''
    }

    // get selected candidate
    selected.job_role = role;

    this.candidateService.updateCandidate(selected).subscribe(returned => {
      if (returned.staff) {
        // show select role dialogbox
        this.RoleChangeDialog(selected);
      } else {
        this.data.changeCandidates(this.CandidateData);
      }

    })
  }

  RoleChangeDialog(candidate: any) {
    this.roleChangeDialogRef = this.dialog.open(RoleChangeDialogComponent,
      {
        width: '65%',
        maxHeight: '85%',
        data: candidate,
      });

    this.roleChangeDialogRef.updatePosition({
      top: '4%',
    });

    this.roleChangeDialogRef.afterClosed().subscribe(() => {
      this.data.changeCandidates(this.CandidateData);
    })
  }

  ngOnDestroy() {
    this.subscriptionCandidates.unsubscribe();
  }

}
