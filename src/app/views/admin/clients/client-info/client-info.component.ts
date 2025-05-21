import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { environment } from 'src/environments/environment';
import { NewClientComponent } from '../new-client/new-client.component';
import { ViewClientComponent } from '../view-client/view-client.component';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {

  public clientDialogRef!: MatDialogRef<NewClientComponent>;

  public displayedColumns: string[] = ['name', 'company_name', 'country', 'website', 'phone', 'action'];
  public dataSource: MatTableDataSource<Client> | any;
  public selection = new SelectionModel<Client>(true, []);
  public dialogRef: MatDialogRef<any> | undefined;
  public client!: Client;
  public ClientData: any = [];
  public clients_available: boolean = false;
  @ViewChild('client_paginator', { static: false }) client_paginator!: MatPaginator;
  public pageSizeOptions: number[] = [];
  public pageEvent!: PageEvent;
  public pageSize = 5;
  public loading: boolean = false;
  public clientsList = true;

  constructor(
    private dialog: MatDialog,
    private clientService: ClientService,
    private router: Router,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  //create new client
  openNewClientDialog() {
    this.clientDialogRef = this.dialog.open(NewClientComponent, { width: '65%', height: '85%', maxHeight: '85%' });

    this.clientDialogRef.updatePosition({
      top: '3%',
    });

    this.clientDialogRef.afterClosed().subscribe(returned => {
      this.getClients();
    })
  }

  //get clients from database
  getClients() {

    this.loading = true;

    this.clientService.getAllClients().subscribe(data => {

      this.ClientData = data;

      if (this.ClientData.length == 0) {
        this.loading = false;
        this.clientsList = false;
      } else {
        this.clientsList = true;
      }

      this.dataSource = new MatTableDataSource<Client>(this.ClientData);
      setTimeout(() => {
        this.dataSource.paginator = this.client_paginator;
      }, 0);

      this.loading = false;

    })
  }

  public applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
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

  //deleting client
  deleteClient(index: number, e: any) {
    const data = this.dataSource.data;
    console.log('page index', this.client_paginator.pageIndex)
    data.splice((this.client_paginator.pageIndex * this.client_paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.clientService.deleteClient(e.id).subscribe()
  }


  //confirm to delete client
  confirmDialog(myindex: number, e: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "NB: This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteClient(myindex, e);
        this.notifier.Notification("success", "client successfully deleted.");
      }
    });
  }

  //view client
  openViewClient(selected: any): void {
    const dialogRef = this.dialog.open(ViewClientComponent, {
      width: '70%',
      height: '85%',
      maxHeight: '85%',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '3%',
    });
  }

  // editClient(selected: any) {
  //   console.log(selected)
  //   this.router.navigate(['clients/:id']);
  // }

  public editClient(selected: any) {

    var myurl = `clients/${selected._id}`;

    this.router.navigateByUrl(myurl).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

}
