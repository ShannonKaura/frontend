import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { CompanyDepartment } from 'src/app/models/company-department';
import { NotifierService } from 'src/app/services/notifier.service';
import { CompanyDepartmentService } from 'src/app/services/company-department.service';
import { EditCompanyDepartmentComponent } from '../edit-company-department/edit-company-department.component';
import { NewCompanyDepartmentComponent } from '../new-company-department/new-company-department.component';

@Component({
  selector: 'app-company-department-info',
  templateUrl: './company-department-info.component.html',
  styleUrls: ['./company-department-info.component.scss']
})
export class CompanyDepartmentInfoComponent implements OnInit {

  public companyDepartmentDialogRef!: MatDialogRef<NewCompanyDepartmentComponent>;
  public displayedColumns: string[] = ['department_name', 'action'];
  public dataSource!: MatTableDataSource<CompanyDepartment>;
  public selection = new SelectionModel<CompanyDepartment>(true, []);
  public dialogRef: MatDialogRef<any> | undefined;
  public companyDepartment!: CompanyDepartment;
  public CompanyDepartmentData: any = [];
  @ViewChild('company_department_paginator', { static: false }) company_department_paginator!: MatPaginator;
  public pageSizeOptions: number[] = [];
  public pageEvent!: PageEvent;
  public pageSize = 100;
  public loading: boolean = false;
  public companiesList = true;


  constructor(
    private dialog: MatDialog,
    private companyDepartmentService: CompanyDepartmentService,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.getCompanyDepartments();
  }

  //create new companyDepartment
  openNewCompanyDepartmentDialog() {
    this.companyDepartmentDialogRef = this.dialog.open(NewCompanyDepartmentComponent, { width: '50%', maxHeight: '620px' });
    this.companyDepartmentDialogRef.updatePosition({
      top: '4%',
    });

    this.companyDepartmentDialogRef.afterClosed().subscribe(result => {
      this.getCompanyDepartments();
    });
  }

  //get companyDepartments from database
  getCompanyDepartments() {
    this.loading = true;

    this.companyDepartmentService.getAllCompanyDepartments().subscribe(data => {

      this.CompanyDepartmentData = data;

      if (this.CompanyDepartmentData.length == 0) {
        this.loading = false;
        this.companiesList = false;
      } else {
        this.companiesList = true;
      }

      this.dataSource = new MatTableDataSource<CompanyDepartment>(this.CompanyDepartmentData);
      setTimeout(() => {
        this.dataSource.paginator = this.company_department_paginator;
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

  //deleting companyDepartment
  deleteCompanyDepartment(index: number, e: any) {
    const data = this.dataSource.data;
    console.log('page index', this.company_department_paginator.pageIndex)
    data.splice((this.company_department_paginator.pageIndex * this.company_department_paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.companyDepartmentService.deleteCompanyDepartment(e.id).subscribe()
  }


  //confirm to delete companyDepartment
  confirmDialog(myindex: number, e: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "NB: This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCompanyDepartment(myindex, e);
        this.notifier.Notification("success", "companyDepartment successfully deleted.");
      }
    });
  }

  //update companyDepartment
  openEditCompanyDepartment(selected: any): void {
    const dialogRef = this.dialog.open(EditCompanyDepartmentComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });
  }

}

