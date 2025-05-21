import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { AccessLevel } from 'src/app/models/access-level';
import { NotifierService } from 'src/app/services/notifier.service';
import { AccessLevelService } from 'src/app/services/access-level.service';
import { EditAccessLevelComponent } from '../edit-access-level/edit-access-level.component';
import { NewAccessLevelComponent } from '../new-access-level/new-access-level.component';

@Component({
  selector: 'app-access-level-info',
  templateUrl: './access-level-info.component.html',
  styleUrls: ['./access-level-info.component.scss']
})
export class AccessLevelInfoComponent implements OnInit {

  public accessLevelDialogRef!: MatDialogRef<NewAccessLevelComponent>;
  public displayedColumns: string[] = ['role_name', 'action'];
  public dataSource!: MatTableDataSource<AccessLevel>;
  public selection = new SelectionModel<AccessLevel>(true, []);
  public dialogRef: MatDialogRef<any> | undefined;
  public accessLevel!: AccessLevel;
  public AccessLevelData: any = [];
  @ViewChild('access_level_paginator', { static: false }) access_level_paginator!: MatPaginator;
  public pageSizeOptions: number[] = [];
  public pageEvent!: PageEvent;
  public pageSize = 100;
  public loading: boolean = false;
  public accessLevelsList = true;


  constructor(
    private dialog: MatDialog,
    private accessLevelService: AccessLevelService,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.getAccessLevels();
  }

  //create new accessLevel
  openNewAccessLevelDialog() {
    this.accessLevelDialogRef = this.dialog.open(NewAccessLevelComponent, { width: '50%', maxHeight: '620px' });
    this.accessLevelDialogRef.updatePosition({
      top: '4%',
    });

    this.accessLevelDialogRef.afterClosed().subscribe(result => {
      this.getAccessLevels();
    });
  }

  //get accessLevels from database
  getAccessLevels() {

    this.loading = true;

    this.accessLevelService.getAllAccessLevels().subscribe(data => {
      this.AccessLevelData = data;

      if (this.AccessLevelData.length == 0) {
        this.loading = false;
        this.accessLevelsList = false;
      } else {
        this.accessLevelsList = true;
      }

      this.dataSource = new MatTableDataSource<AccessLevel>(this.AccessLevelData);
      setTimeout(() => {
        this.dataSource.paginator = this.access_level_paginator;
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

  //deleting accessLevel
  deleteAccessLevel(index: number, e: any) {
    const data = this.dataSource.data;
    console.log('page index', this.access_level_paginator.pageIndex)
    data.splice((this.access_level_paginator.pageIndex * this.access_level_paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.accessLevelService.deleteAccessLevel(e.id).subscribe()
  }


  //confirm to delete accessLevel
  confirmDialog(myindex: number, e: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "NB: This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAccessLevel(myindex, e);
        this.notifier.Notification("success", "accessLevel successfully deleted.");
      }
    });
  }

  //update accessLevel
  openEditAccessLevel(selected: any): void {
    const dialogRef = this.dialog.open(EditAccessLevelComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });
  }

}

