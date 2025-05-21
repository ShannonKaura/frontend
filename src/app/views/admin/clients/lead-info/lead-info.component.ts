import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Lead } from 'src/app/models/lead';
import { LeadService } from 'src/app/services/lead.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { ViewLeadComponent } from '../view-lead/view-lead.component';

@Component({
  selector: 'app-lead-info',
  templateUrl: './lead-info.component.html',
  styleUrls: ['./lead-info.component.scss']
})
export class LeadInfoComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'company', 'email', 'created', 'action'];
  public dataSource: MatTableDataSource<Lead> | any;
  public selection = new SelectionModel<Lead>(true, []);
  public dialogRef: MatDialogRef<any> | undefined;
  public lead!: Lead;
  public LeadData: any = [];
  public loading: boolean = false;
  public leads_available: boolean = false;
  @ViewChild('lead_paginator', { static: false }) lead_paginator!: MatPaginator;
  public pageSizeOptions: number[] = [];
  public pageEvent!: PageEvent;
  public pageSize = 100;
  public no_filtered_results: boolean = false;

  constructor(
    private dialog: MatDialog,
    private leadService: LeadService,
    private router: Router,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.getLeads();
  }

  //get leads from database
  getLeads() {
    this.loading = true;
    this.leads_available = false;


    this.leadService.getAllLeads().subscribe(data => {
      this.LeadData = data;


      if (this.LeadData.length > 0) {
        this.leads_available = true;
        this.loading = false;
      } else {
        this.leads_available = false;
        this.no_filtered_results = true;
        this.loading = false;
      }

      this.dataSource = new MatTableDataSource<Lead>(this.LeadData);
      setTimeout(() => {
        this.dataSource.paginator = this.lead_paginator;
      }, 0);
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

  //deleting lead
  deleteLead(index: number, e: any) {
    const data = this.dataSource.data;
    console.log('page index', this.lead_paginator.pageIndex)
    data.splice((this.lead_paginator.pageIndex * this.lead_paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.leadService.deleteLead(e.id).subscribe()
  }


  //confirm to delete lead
  confirmDialog(myindex: number, e: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "NB: This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteLead(myindex, e);
        this.notifier.Notification("success", "lead successfully deleted.");
      }
    });
  }

  //view lead
  openViewLead(selected: any): void {
    const dialogRef = this.dialog.open(ViewLeadComponent, {
      width: '70%',
      height: '85%',
      maxHeight: '85%',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '3%',
    });
  }

  // editLead(selected: any) {
  //   console.log(selected)
  //   this.router.navigate(['leads/:id']);
  // }

  public editLead(selected: any) {

    var myurl = `leads/${selected._id}`;

    this.router.navigateByUrl(myurl).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

}
