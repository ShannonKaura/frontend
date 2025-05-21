import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { User } from 'src/app/models/user';
import { NotifierService } from 'src/app/services/notifier.service';
import { UserService } from 'src/app/services/user.service';
import { ViewUserComponent } from '../view-user/view-user.component';
import { NewUserComponent } from '../new-user/new-user.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  public userDialogRef!: MatDialogRef<NewUserComponent>;
  public displayedColumns: string[] = ['name', 'email', 'status', 'access_level', 'action'];
  public dataSource: MatTableDataSource<User> | any;
  public selection = new SelectionModel<User>(true, []);
  public dialogRef: MatDialogRef<any> | undefined;
  public user!: User;
  public UserData: any = [];
  @ViewChild('user_paginator', { static: false }) user_paginator!: MatPaginator;
  public pageSizeOptions: number[] = [];
  public pageEvent!: PageEvent;
  public pageSize = 5;
  public no_filtered_results: boolean = false;
  public loading: boolean = false;
  public usersList = true;


  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  //create new user
  openNewUserDialog() {
    this.userDialogRef = this.dialog.open(NewUserComponent, {
      width: '70%',
      maxHeight: '80%',
    });
    this.userDialogRef.updatePosition({
      top: '4%',
    });

    this.userDialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

  //get users from database
  getUsers() {
    this.loading = true;

    this.userService.getAllUsers().subscribe(users => {

      this.UserData = users;

      if (this.UserData.length == 0) {
        this.loading = false;
        this.usersList = false;
      } else {
        this.usersList = true;
      }

      this.dataSource = new MatTableDataSource<User>(this.UserData);

      setTimeout(() => {
        this.dataSource.paginator = this.user_paginator;
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

  //deleting user
  deleteUser(index: number, e: any) {
    const data = this.dataSource.data;
    console.log('page index', this.user_paginator.pageIndex)
    data.splice((this.user_paginator.pageIndex * this.user_paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.userService.deleteUser(e.id).subscribe()
  }


  //confirm to delete user
  confirmDialog(myindex: number, e: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "NB: This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(myindex, e);
        this.notifier.Notification("success", "user successfully deleted.");
      }
    });
  }

  //update user
  // openEditUser(selected: any): void {
  //   const dialogRef = this.dialog.open(EditUserComponent, {
  //     width: '70%',
  //     maxHeight: '80%',
  //     data: selected,
  //   });

  //   dialogRef.updatePosition({
  //     top: '4%',
  //   });
  // }

  public openEditUser(selected: any) {

    var myurl = `admin/${selected._id}`;

    this.router.navigateByUrl(myurl).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }


  openViewUser(selected: any): void {
    const dialogRef = this.dialog.open(ViewUserComponent, {
      width: '70%',
      maxHeight: '80%',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });
  }

}
