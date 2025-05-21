import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.scss']
})
export class EditCountryComponent implements OnInit {

  public country!: Country;
  public maxDate: Date = new Date();
  public hide = true;

  constructor(
    private countryService: CountryService,
    @Inject(MAT_DIALOG_DATA) public countrydatainfo: any,
    private dialogRef: MatDialogRef<EditCountryComponent>,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.initCountry();
    this.getCountry();
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

  // get country by Id
  getCountry() {
    const countryId = this.countrydatainfo.id
    if (countryId) {
      this.countryService.getCountryById(countryId).subscribe(returnedcountry => {
        this.country = returnedcountry;
      })
    }
  }

  //update country
  updateCountry(country: Country) {
    this.countryService.updateCountry(country).subscribe(updatedCountry => {
      this.country = updatedCountry;

      if (this.country) {
        this.notifier.Notification("success", "country successfully updated.");
        this.dialogRef.close();
      } else {
        this.notifier.Notification("warning", "failed to save.");
      }
    })
  }

  close() {
    this.dialogRef.close();
  }
}
