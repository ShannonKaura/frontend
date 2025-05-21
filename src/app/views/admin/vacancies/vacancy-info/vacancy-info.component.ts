import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Vacancy } from 'src/app/models/vacancy';
import { NotifierService } from 'src/app/services/notifier.service';
import { VacancyService } from 'src/app/services/vacancy.service';
import { NewVacancyComponent } from '../new-vacancy/new-vacancy.component';
import { ViewVacancyComponent } from '../view-vacancy/view-vacancy.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-vacancy-info',
  templateUrl: './vacancy-info.component.html',
  styleUrls: ['./vacancy-info.component.scss']
})
export class VacancyInfoComponent implements OnInit {

  // public vacancyDialogRef!: MatDialogRef<NewVacancyComponent>;
  public vacancyDialogRef!: MatDialogRef<NewVacancyComponent>;
  public displayedColumns: string[] = ['category', 'name', 'vacancy_type', 'expiry_date', 'action'];
  public dataSource!: MatTableDataSource<Vacancy> | any;
  public selection = new SelectionModel<Vacancy>(true, []);
  public dialogRef: MatDialogRef<any> | undefined;
  public vacancy!: Vacancy;
  public VacancyData: any = [];
  @ViewChild('vacancy_paginator', { static: false }) vacancy_paginator!: MatPaginator;
  public pageSizeOptions: number[] = [];
  public pageEvent!: PageEvent;
  public pageSize = 100;
  public loading: boolean = false;
  public no_filtered_results: boolean = false;
  public empty_vacancies: boolean = false;
  public observable: any;


  constructor(
    private dialog: MatDialog,
    private vacancyService: VacancyService,
    private router: Router,
    private notifier: NotifierService,
  ) {
  }

  ngOnInit(): void {
    this.getVacancies();
  }

  //get vacancies from database
  getVacancies() {
    this.loading = true;

    this.vacancyService.getAllVacancies().subscribe(data => {
      this.VacancyData = data;

      if (this.VacancyData.length > 0) {
        this.dataSource = new MatTableDataSource<Vacancy>(this.VacancyData);
        setTimeout(() => {
          this.loading = false;
          this.empty_vacancies = false;
          this.dataSource.paginator = this.vacancy_paginator;
        }, 0);
      } else {
        this.loading = false;
        this.empty_vacancies = true;
      }

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

  //deleting vacancy
  deleteVacancy(index: number, e: any) {
    const data = this.dataSource.data;
    data.splice((this.vacancy_paginator.pageIndex * this.vacancy_paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.vacancyService.deleteVacancy(e.id).subscribe()
  }

  //update vacancy
  openViewVacancy(selected: any): void {
    const dialogRef = this.dialog.open(ViewVacancyComponent, {
      width: '70%',
      height: '85%',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '3%',
    });
  }

  public editVacancy(selected: any) {

    var myurl = `vacancies/${selected._id}`;

    this.router.navigateByUrl(myurl).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }


  //confirm to delete vacancy
  confirmDialog(myindex: number, e: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "NB: This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteVacancy(myindex, e);
        this.notifier.Notification("success", "vacancy successfully deleted.");
      }
    });
  }

  //create new vacancy
  openNewVacancyDialog() {
    this.vacancyDialogRef = this.dialog.open(NewVacancyComponent, { width: '65%', height: '85%' });

    this.vacancyDialogRef.updatePosition({
      top: '3%',
    });

    this.vacancyDialogRef.afterClosed().subscribe(() => {
      this.getVacancies();
    });
  }

}
