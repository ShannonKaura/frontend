import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Staff } from 'src/app/models/staff';
import { NotifierService } from 'src/app/services/notifier.service';
import { StaffService } from 'src/app/services/staff.service';
import { ViewStaffComponent } from '../view-staff/view-staff.component';
import { NewStaffComponent } from '../new-staff/new-staff.component';

@Component({
  selector: 'app-staff-info',
  templateUrl: './staff-info.component.html',
  styleUrls: ['./staff-info.component.scss']
})
export class StaffInfoComponent implements OnInit {

  public staffDialogRef!: MatDialogRef<NewStaffComponent>;
  public displayedColumns: string[] = ['name', 'phone', 'email', 'job_title', 'action'];
  public dataSource: MatTableDataSource<Staff> | any;
  public selection = new SelectionModel<Staff>(true, []);
  public dialogRef: MatDialogRef<any> | undefined;
  public staff!: Staff;
  public StaffData: any = [];
  @ViewChild('staff_paginator', { static: false }) staff_paginator!: MatPaginator;
  public pageSizeOptions: number[] = [];
  public pageEvent!: PageEvent;
  public pageSize = 5;
  public no_filtered_results: boolean = false;
  public loading: boolean = false;
  public staffList = true;


  constructor(
    private dialog: MatDialog,
    private staffService: StaffService,
    private router: Router,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.getStaffs();
  }

  //create new staff
  openNewStaffDialog() {
    this.staffDialogRef = this.dialog.open(NewStaffComponent, {
      width: '70%',
      maxHeight: '90%',
      height: '90%',
    });
    this.staffDialogRef.updatePosition({
      top: '4%',
    });

    this.staffDialogRef.afterClosed().subscribe(result => {
      this.getStaffs();
    });
  }

  //get staffs from database
  getStaffs() {
    this.loading = true;

    this.staffService.getAllStaff().subscribe(data => {
      this.StaffData = data;

      if (this.StaffData.length == 0) {
        this.loading = false;
        this.staffList = false;
      } else {
        this.staffList = true;
      }

      this.dataSource = new MatTableDataSource<Staff>(this.StaffData);
      setTimeout(() => {
        this.dataSource.paginator = this.staff_paginator;
      }, 0);

      this.loading = false;

    })
  }

  public applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
    this.dataSource.paginator.firstPage();

    if (this.dataSource.filteredData.length === 0) {
      this.no_filtered_results = true;
    } else {
      this.no_filtered_results = false;
    }
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
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }

  //deleting staff
  deleteStaff(index: number, e: any) {
    const data = this.dataSource.data;
    console.log('page index', this.staff_paginator.pageIndex)
    data.splice((this.staff_paginator.pageIndex * this.staff_paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.staffService.deleteStaff(e.id).subscribe()
  }


  //confirm to delete staff
  confirmDialog(myindex: number, e: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "NB: This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteStaff(myindex, e);
        this.notifier.Notification("success", "staff successfully deleted.");
      }
    });
  }

  public openEditStaff(selected: any) {

    var myurl = `staff/${selected._id}`;

    this.router.navigateByUrl(myurl).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }


  openViewStaff(selected: any): void {
    const dialogRef = this.dialog.open(ViewStaffComponent, {
      width: '70%',
      maxHeight: '80%',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });
  }

}
