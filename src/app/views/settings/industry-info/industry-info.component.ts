import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Industry } from 'src/app/models/industry';
import { IndustryService } from 'src/app/services/industry.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { EditIndustryComponent } from '../edit-industry/edit-industry.component';
import { NewIndustryComponent } from '../new-industry/new-industry.component';

@Component({
  selector: 'app-industry-info',
  templateUrl: './industry-info.component.html',
  styleUrls: ['./industry-info.component.scss']
})
export class IndustryInfoComponent implements OnInit {

  public industryDialogRef!: MatDialogRef<NewIndustryComponent>;
  public displayedColumns: string[] = ['industry_name', 'action'];
  public dataSource!: MatTableDataSource<Industry>;
  public selection = new SelectionModel<Industry>(true, []);
  public dialogRef: MatDialogRef<any> | undefined;
  public industry!: Industry;
  public IndustryData: any = [];
  @ViewChild('industry_paginator', { static: false }) industry_paginator!: MatPaginator;
  public pageSizeOptions: number[] = [];
  public pageEvent!: PageEvent;
  public pageSize = 100;
  public loading: boolean = false;
  public industriesList: boolean = true;


  constructor(
    private dialog: MatDialog,
    private industryService: IndustryService,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.getIndustries();
  }

  //create new industry
  openNewIndustryDialog() {
    this.industryDialogRef = this.dialog.open(NewIndustryComponent, { width: '50%', maxHeight: '620px' });
    this.industryDialogRef.updatePosition({
      top: '4%',
    });

    this.industryDialogRef.afterClosed().subscribe(result => {
      this.getIndustries();
    });
  }

  //get industries from database
  getIndustries() {
    this.loading = true;

    this.industryService.getAllIndustries().subscribe(data => {
      this.IndustryData = data;

      if (this.IndustryData.length == 0) {
        this.loading = false;
        this.industriesList = false;
      } else {
        this.industriesList = true;
      }

      this.dataSource = new MatTableDataSource<Industry>(this.IndustryData);
      setTimeout(() => {
        this.dataSource.paginator = this.industry_paginator;
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

  //deleting industry
  deleteIndustry(index: number, e: any) {
    const data = this.dataSource.data;
    console.log('page index', this.industry_paginator.pageIndex)
    data.splice((this.industry_paginator.pageIndex * this.industry_paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.industryService.deleteIndustry(e.id).subscribe()
  }


  //confirm to delete industry
  confirmDialog(myindex: number, e: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "NB: This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteIndustry(myindex, e);
        this.notifier.Notification("success", "industry successfully deleted.");
      }
    });
  }

  //update industry
  openEditIndustry(selected: any): void {
    const dialogRef = this.dialog.open(EditIndustryComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });
  }

}
