import { Component, EventEmitter, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, FormGroupDirective, NgForm } from "@angular/forms";
import { MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from 'src/app/services/notifier.service';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';
import { CountryService } from 'src/app/services/country.service';
import { IndustryService } from 'src/app/services/industry.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {
  public preview!: string;
  public form!: UntypedFormGroup;
  public percentDone: any = 0;
  public clients = [];


  public client!: Client;
  public onClientCreation = new EventEmitter();
  public maxDate: Date = new Date();
  public hide = true;
  public isEditable = true;
  public countries: any;
  public industries: any;

  public basic_details = true;
  public company_details = false;
  public contact_details = false;

  public position!: string;

  public horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  public verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  public matcher = new MyErrorStateMatcher();



  constructor(
    public fb: UntypedFormBuilder,
    public clientService: ClientService,
    public dialogRef: MatDialogRef<NewClientComponent>,
    private notifier: NotifierService,
    private countryService: CountryService,
    private industryService: IndustryService,
  ) {

  }

  ngOnInit() {
    this.initClient();
    this.getCountries();
    this.getIndustries();
  }

  ngOnDestroy() {

  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  /********************************** */

  initClient() {
    // Reactive Form
    this.client = {
      _id: '',
      company_name: '',
      name: '',
      email_address: '',
      phone_number: '',
      contact_physical_address: '',
      business_overview: '',
      industry_category: '',
      business_entity: '',
      website: '',
      country: '',
      recruitment_details: {
        vacancy_categories: [],
        vacancy_details: [],
        qualifications: [],
        job_types: [],
        experience: [],
        age_preference: [],
        starting_date: new Date(Date.now()),
      },
      notes: '',
      created_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
    }
  }


  addClient() {
    this.clientService.addClient(this.client).subscribe(returned => {
      this.notifier.Notification("success", "Client Successfully Created");
      this.dialogRef.close();
    })

  }


  onCloseClick(): void {
    this.dialogRef.close();
  }


  close() {
    this.dialogRef.close();
  }

  changeCompanyLogo(event: any) {
    console.log(event._files[0]);
  }

  getCountries() {
    this.countryService.getAllCountries().subscribe(returned_countries => {
      this.countries = returned_countries
    })
  }

  getIndustries() {
    this.industryService.getAllIndustries().subscribe(returned_industries => {
      this.industries = returned_industries
    })
  }

  getNameMessage() {
    return 'First name is required';
  }

  getCountryMessage() {
    return 'Country is required';
  }

  getComapnyNameMessage() {
    return 'Company name is required';
  }

  getCompanyOwnerNameMessage() {
    return 'Company owner or CEO is required';
  }

  getCompanyAddressMessage() {
    return 'Company address is required';
  }

  getContactPersonMessage() {
    return 'Contact person is required';
  }

  getCompanyEmailMessage() {
    return 'Email is required';
  }

  getPrimaryPhoneMessage() {
    return 'Phone number is required';
  }

  getContactPhysicalAddressMessage() {
    return 'Physical address is required';
  }

  getLogoMessage() {
    return 'Logo is required';
  }

  getCompanyIndustryMessage() {
    return 'Industry is required';
  }

  getTitleMessage() {
    return 'Select title';
  }

  getBusinessEntityMessage() {
    return 'Select business entity';
  }
}

