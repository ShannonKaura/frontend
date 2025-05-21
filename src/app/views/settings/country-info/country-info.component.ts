import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { EditCountryComponent } from '../edit-country/edit-country.component';
import { NewCountryComponent } from '../new-country/new-country.component';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.scss']
})
export class CountryInfoComponent implements OnInit {

  public countryDialogRef!: MatDialogRef<NewCountryComponent>;
  public displayedColumns: string[] = ['country_name', 'action'];
  public dataSource!: MatTableDataSource<Country>;
  public selection = new SelectionModel<Country>(true, []);
  public dialogRef: MatDialogRef<any> | undefined;
  public country!: Country;
  public CountryData: any = [];
  @ViewChild('country_paginator', { static: false }) country_paginator!: MatPaginator;
  public pageSizeOptions: number[] = [];
  public pageEvent!: PageEvent;
  public pageSize = 100;
  public loading: boolean = false;
  public countryList: boolean = true;


  constructor(
    private dialog: MatDialog,
    private countryService: CountryService,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.getCountries();
  }

  //create new country
  openNewCountryDialog() {
    this.countryDialogRef = this.dialog.open(NewCountryComponent, { width: '50%', maxHeight: '620px' });
    this.countryDialogRef.updatePosition({
      top: '4%',
    });

    this.countryDialogRef.afterClosed().subscribe(result => {
      this.getCountries();
    });
  }

  //get countries from database
  getCountries() {

    this.loading = true;

    this.countryService.getAllCountries().subscribe(data => {
      this.CountryData = data;

      if (this.CountryData.length > 0) {
        this.loading = false;
        this.countryList = true;
      } else {
        this.countryList = false;
      }

      this.dataSource = new MatTableDataSource<Country>(this.CountryData);
      setTimeout(() => {
        this.dataSource.paginator = this.country_paginator;
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

  //deleting country
  deleteCountry(index: number, e: any) {
    const data = this.dataSource.data;
    console.log('page index', this.country_paginator.pageIndex)
    data.splice((this.country_paginator.pageIndex * this.country_paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.countryService.deleteCountry(e.id).subscribe()
  }


  //confirm to delete country
  confirmDialog(myindex: number, e: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "NB: This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCountry(myindex, e);
        this.notifier.Notification("success", "user successfully deleted.");
      }
    });
  }

  //update country
  openEditCountry(selected: any): void {
    const dialogRef = this.dialog.open(EditCountryComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });
  }

}
