import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

export interface Client {
  name: string;
  email: string;
  phone: string;
}

export interface Talent {
  talent_name: '',
  skills: [],
  job_titles: [],
}

@Component({
  selector: 'app-client-landing',
  templateUrl: './client-landing.component.html',
  styleUrls: ['./client-landing.component.scss']
})

export class ClientLandingComponent implements OnInit {

  public client: Client = {
    name: '',
    email: '',
    phone: '',
  }

  public talent: Talent = {
    talent_name: '',
    skills: [],
    job_titles: [],
  }

  public talentpool: any = [];

  public software_engineering_color: boolean = false;
  public cyber_security_color: boolean = false;
  public digital_marketing_color: boolean = false;
  public social_media_color: boolean = false;
  public graphic_design_color: boolean = false;
  public it_support_color: boolean = false;
  public uiux_design_color: boolean = false;
  public admin_color: boolean = false;
  public accounting_color: boolean = false;
  public sales_color: boolean = false;
  public inbound_outbound_color: boolean = false;
  public lead_generation_color: boolean = false;

  public newclient!: any;
  public subscription!: Subscription;



  constructor(
    private router: Router,
    private data: DataService
  ) { }

  ngOnInit(): void {
    this.subscription = this.data.currentClient.subscribe(client => this.newclient = client)
  }

  HireTalent() {
    window.location.href = '/clients#talentpool';
  }

  // talent pool selection
  AddTalentPool(talent_name: any) {
    const talent = {
      talent_name: talent_name,
      skills: [],
      job_titles: [],
    }

    this.talentpool.push(talent);

    console.log(this.talentpool);
  }

  RemoveTalentPool(talent: any) {
    this.talentpool = this.talentpool.filter((object: any) => {
      return object.talent_name !== talent;
    });
  }

  RevertSoftwareEngineering() {
    if (this.software_engineering_color === false) {
      this.software_engineering_color = true;

      this.AddTalentPool('Software Engineering');

    } else {
      this.software_engineering_color = false;

      this.RemoveTalentPool('Software Engineering');
    }
  }

  RevertCyberSecurity() {

    if (this.cyber_security_color === false) {
      this.cyber_security_color = true;

      this.AddTalentPool('Cyber Security');

    } else {
      this.cyber_security_color = false;

      this.RemoveTalentPool('Cyber Security');
    }
  }

  RevertDigitalMarketing() {
    if (this.digital_marketing_color === false) {
      this.digital_marketing_color = true;

      this.AddTalentPool('Digital Marketing');

    } else {
      this.digital_marketing_color = false;

      this.RemoveTalentPool('Digital Marketing');
    }
  }

  RevertSocialMediaManagement() {
    if (this.social_media_color === false) {
      this.social_media_color = true;

      this.AddTalentPool('Social Media Management');

    } else {
      this.social_media_color = false;

      this.RemoveTalentPool('Social Media Management');
    }
  }

  RevertGraphicDesign() {
    if (this.graphic_design_color === false) {
      this.graphic_design_color = true;

      this.AddTalentPool('Graphic Design/Illustration');

    } else {
      this.graphic_design_color = false;

      this.RemoveTalentPool('Graphic Design/Illustration');
    }
  }

  RevertITSupport() {

    if (this.it_support_color === false) {
      this.it_support_color = true;

      this.AddTalentPool('IT Support/Helpdesk');

    } else {
      this.it_support_color = false;

      this.RemoveTalentPool('IT Support/Helpdesk');
    }
  }

  RevertUIUXDesign() {

    if (this.uiux_design_color === false) {
      this.uiux_design_color = true;

      this.AddTalentPool('UI/UX Design');

    } else {
      this.uiux_design_color = false;

      this.RemoveTalentPool('UI/UX Design');
    }
  }

  RevertAdmin() {

    if (this.admin_color === false) {
      this.admin_color = true;

      this.AddTalentPool('Admin');

    } else {
      this.admin_color = false;

      this.RemoveTalentPool('Admin');
    }
  }

  RevertAccounting() {

    if (this.accounting_color === false) {
      this.accounting_color = true;

      this.AddTalentPool('Accounting/Bookkeeping');

    } else {
      this.accounting_color = false;

      this.RemoveTalentPool('Accounting/Bookkeeping');
    }
  }

  RevertSales() {

    if (this.sales_color === false) {
      this.sales_color = true;

      this.AddTalentPool('Sales/Marketing');

    } else {
      this.sales_color = false;

      this.RemoveTalentPool('Sales/Marketing');
    }
  }


  RevertInboundOutboundCalls() {

    if (this.inbound_outbound_color === false) {
      this.inbound_outbound_color = true;

      this.AddTalentPool('Inbound/Outbound Calls');

    } else {
      this.inbound_outbound_color = false;

      this.RemoveTalentPool('Inbound/Outbound Calls');
    }
  }


  RevertLeadGeneration() {

    if (this.lead_generation_color === false) {
      this.lead_generation_color = true;

      this.AddTalentPool('LeadGeneration');

    } else {
      this.lead_generation_color = false;

      this.RemoveTalentPool('LeadGeneration');
    }
  }


  ContinueToHire() {
    const new_client = {
      client: this.client,
      talent: this.talentpool
    }

    this.data.changeClient(new_client)


    const url = `/hire`;
    this.router.navigate([url]);


  }

  getNamelMessage() {
    return "Enter your full name";
  }

  getEmailErrorMessage() {
    return "Enter your email address";
  }

  getPhoneErrorMessage() {
    return "Enter your mobile phone number";
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
