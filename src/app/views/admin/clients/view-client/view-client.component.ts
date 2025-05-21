import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit {

  public client!: Client;
  public maxDate: Date = new Date();
  public hide = true;

  constructor(
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public clientdatainfo: any,
    private dialogRef: MatDialogRef<ViewClientComponent>,
  ) { }

  ngOnInit(): void {
    this.initClient();
    this.getClient();
  }

  // initialize client model
  initClient() {
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
        starting_date: null,
      },
      notes: '',
      created_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
    }
  }

  // get client by Id
  getClient() {
    const clientId = this.clientdatainfo.id
    if (clientId) {
      this.clientService.getClientById(clientId).subscribe(returnedclient => {
        this.client = returnedclient;
      })
    }
  }

  close() {
    this.dialogRef.close();
  }
}
