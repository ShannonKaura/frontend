import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-new-country',
  templateUrl: './new-country.component.html',
  styleUrls: ['./new-country.component.scss']
})
export class NewCountryComponent implements OnInit {

  public country!: Country;
  public onCountryCreation = new EventEmitter();
  public maxDate: Date = new Date();
  public hide = true;

  constructor(
    private countryService: CountryService,
    private dialogRef: MatDialogRef<NewCountryComponent>,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.initCountry();
  }


  // initialize country model
  initCountry() {
    this.country = {
      _id: '',
      country_name: '',
      country_code: '',
      original_country_record: {},
      modified_country_records: [],
      created_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
      delete: {},
    }
  }

  // add country to database
  addCountry(country: Country) {
    this.countryService.addCountry(country).subscribe(createdCountry => {
      this.onCountryCreation.emit(country);

      if (createdCountry) {
        this.notifier.Notification("success", "new country successfully saved.");
        this.close()
      } else {
        this.notifier.Notification("warning", "failed to save.");
      }
    })
  }

  close() {
    this.dialogRef.close();
  }

}
