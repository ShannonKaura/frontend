import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lead } from 'src/app/models/lead';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-view-lead',
  templateUrl: './view-lead.component.html',
  styleUrls: ['./view-lead.component.scss']
})
export class ViewLeadComponent implements OnInit {

  public lead!: Lead;
  public maxDate: Date = new Date();
  public hide = true;

  constructor(
    private leadService: LeadService,
    @Inject(MAT_DIALOG_DATA) public leaddatainfo: any,
    private dialogRef: MatDialogRef<ViewLeadComponent>,
  ) { }

  ngOnInit(): void {
    this.initLead();
    this.getLead();
  }

  // initialise lead
  initLead() {
    this.lead = {
      _id: '',
      basicDetails: {
        client_name: '',
        phone: '',
        email: '',
        website: ''
      },
      talent: [],
      companyDetails: {
        name_of_business: '',
        contact_person: '',
        business_overview: '',
        hiringNeeds: '',
        seedOrVentureCapitalFunded: '',
        publiclyListedOrPostIPOCompany: '',
        currentEmployees: '',
      },
      qualifications: [],
      years_of_experience: [],
      job_type: [],
      age_preference: [],
      expected_start_date: '',
      notes: '',
      created_date: {},
    }
  }

  // get lead by Id
  getLead() {
    const leadId = this.leaddatainfo.id
    if (leadId) {
      this.leadService.getLeadById(leadId).subscribe(returnedlead => {
        this.lead = returnedlead;

        console.log(this.lead)
      })
    }
  }

  close() {
    this.dialogRef.close();
  }
}
