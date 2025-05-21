import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lead } from 'src/app/models/lead';
import { DataService } from 'src/app/services/data.service';
import { LeadService } from 'src/app/services/lead.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

interface Skill {
  name: string;
}

interface CyberSecuritySkill {
  name: string;
}

interface DigitalMarketingSkill {
  name: string;
}

interface SocialMediaSkill {
  name: string;
}

interface GraphicDesignSkill {
  name: string;
}

interface ItSupportSkill {
  name: string;
}

interface UiUxSkill {
  name: string;
}

interface AdminSkill {
  name: string;
}

interface AccountingSkill {
  name: string;
}

interface SalesSkill {
  name: string;
}

interface InboundOutboundSkill {
  name: string;
}

interface LeadGenerationSkill {
  name: string;
}

interface HiringNeeds {
  option: string;
}

interface SeedOrVentureCapital {
  option: string;
}

interface CompanyListed {
  option: string;
}

interface CurrentEmployees {
  option: string;
}

@Component({
  selector: 'app-hire',
  templateUrl: './hire.component.html',
  styleUrls: ['./hire.component.scss']
})
export class HireComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public user: any;

  public page: string | any;
  public subscription: Subscription | any;

  public not_sure_color: boolean = false;
  public react_color: boolean = false;
  public node_color: boolean = false;
  public python_color: boolean = false;
  public angular_color: boolean = false;
  public react_native_color: boolean = false;
  public android_color: boolean = false;
  public java_color: boolean = false;
  public go_color: boolean = false;
  public vue_color: boolean = false;
  public php_color: boolean = false;
  public typescript_color: boolean = false;

  public skills_container: boolean = false;

  public skill: Skill = {
    name: ''
  };

  public cyber_security_skill: CyberSecuritySkill = {
    name: ''
  };

  public digital_marketing_skill: DigitalMarketingSkill = {
    name: ''
  };

  public social_media_skill: SocialMediaSkill = {
    name: ''
  };

  public graphic_design_skill: GraphicDesignSkill = {
    name: ''
  };

  public it_support_skill: ItSupportSkill = {
    name: ''
  };

  public ui_ux_skill: UiUxSkill = {
    name: ''
  };

  public admin_skill: AdminSkill = {
    name: ''
  };

  public accounting_skill: AccountingSkill = {
    name: ''
  };

  public sales_skill: SalesSkill = {
    name: ''
  };

  public inbound_outbound_skill: InboundOutboundSkill = {
    name: ''
  };

  public lead_generation_skill: LeadGenerationSkill = {
    name: ''
  };

  public lead: any;

  public preselected_skill = '';
  public skills: any = [];
  public cyber_security_skills: any = [];
  public digital_marketing_skills: any = [];
  public social_media_skills: any = [];

  public graphic_design_skills: any = [];
  public it_support_skills: any = [];
  public ui_ux_skills: any = [];
  public admin_skills: any = [];
  public accounting_skills: any = [];
  public sales_skills: any = [];
  public inbount_outbound_skills: any = [];
  public lead_generation_skills: any = [];



  public preselected_skills: any = [];
  public combined_skills: any = [];

  public client_details: boolean = false;
  public client_booking: boolean = false;

  public new_client: any;
  public client_subscription: Subscription | any;

  hiringNeeds: HiringNeeds[] = [
    { option: 'Full Time' },
    { option: 'Part Time' },
  ];

  seedOrVentureCapital: SeedOrVentureCapital[] = [
    { option: 'Yes' },
    { option: 'No' },
  ];

  companyListed: CompanyListed[] = [
    { option: 'Yes' },
    { option: 'No' },
  ];

  currentEmployees: CurrentEmployees[] = [
    { option: '1-10' },
    { option: '10-50' },
    { option: '51-250' },
    { option: '251-10K' },
    { option: '10K+' },
  ];

  public selected: Date | any;
  public software_developement_selected: any;
  public software_developement_select_skills: boolean = false;
  public cyber_security_selected: any;
  public cyber_security_select_skills: boolean = false;
  public digital_marketing_selected: any;
  public digital_marketing_select_skills: boolean = false;
  public social_media_management_selected: any;
  public social_media_management_select_skills: boolean = false;
  public graphic_design_selected: any;
  public graphic_design_select_skills: boolean = false;
  public it_support_selected: any;
  public it_support_select_skills: boolean = false;
  public ui_ux_selected: any;
  public ui_ux_select_skills: boolean = false;
  public admin_selected: any;
  public admin_select_skills: boolean = false;
  public accounting_selected: any;
  public accounting_select_skills: boolean = false;
  public sales_selected: any;
  public sales_security_select_skills: boolean = false;
  public inbound_outbound_selected: any;
  public inbound_outbound_select_skills: boolean = false;
  public lead_generation_selected: any;
  public lead_generation_select_skills: boolean = false;
  public detailed_client_details: boolean = false;

  qualifications = new UntypedFormControl();
  qualificationList: string[] = ['Diploma Degree', 'Other'];

  yearsOfExperiences = new UntypedFormControl();
  yearsOfExperienceList: string[] = ['0 1 - 2', '3 - 5', '6 - 10', 'over 10'];

  jobTypes = new UntypedFormControl();
  jobTypeList: string[] = ['Full Time', 'Part Time', 'Contract', 'Other'];

  agePreferences = new UntypedFormControl();
  agePreferenceList: string[] = ['No Age Preference', '18 - 22', '23 - 29', '30 - 40', '40 & Above'];

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private data: DataService,
    private leadService: LeadService
  ) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
    }

    this.subscription = this.data.currentPage.subscribe(page => this.page = page);

    this.client_subscription = this.data.currentClient.subscribe(client => this.new_client = client)

    // check if any talents have been selected from the talent pool
    this.software_developement_selected = this.new_client.talent.some((telent: any) => {
      return telent.talent_name === 'Software Engineering'
    });

    this.cyber_security_selected = this.new_client.talent.some((telent: any) => {
      return telent.talent_name === 'Cyber Security'
    });

    this.digital_marketing_selected = this.new_client.talent.some((telent: any) => {
      return telent.talent_name === 'Digital Marketing'
    });

    this.social_media_management_selected = this.new_client.talent.some((telent: any) => {
      return telent.talent_name === 'Social Media Management'
    });

    this.graphic_design_selected = this.new_client.talent.some((telent: any) => {
      return telent.talent_name === 'Graphic Design/Illustration'
    });

    this.it_support_selected = this.new_client.talent.some((telent: any) => {
      return telent.talent_name === 'IT Support/Helpdesk'
    });

    this.ui_ux_selected = this.new_client.talent.some((telent: any) => {
      return telent.talent_name === 'UI/UX Design'
    });

    this.admin_selected = this.new_client.talent.some((telent: any) => {
      return telent.talent_name === 'Admin'
    });

    this.accounting_selected = this.new_client.talent.some((telent: any) => {
      return telent.talent_name === 'Accounting/Bookkeeping'
    });

    this.sales_selected = this.new_client.talent.some((telent: any) => {
      return telent.talent_name === 'Sales/Marketing'
    });

    this.inbound_outbound_selected = this.new_client.talent.some((telent: any) => {
      return telent.talent_name === 'Inbound/Outbound Calls'
    });

    this.lead_generation_selected = this.new_client.talent.some((telent: any) => {
      return telent.talent_name === 'LeadGeneration'
    });


    if (this.software_developement_selected) {
      this.software_developement_select_skills = true;
      this.skills_container = true;
    }

    if (this.cyber_security_selected) {
      this.cyber_security_select_skills = true;
      this.skills_container = true;
    }

    if (this.digital_marketing_selected) {
      this.digital_marketing_select_skills = true;
      this.skills_container = true;
    }

    if (this.social_media_management_selected) {
      this.social_media_management_select_skills = true;
      this.skills_container = true;
    }

    if (this.graphic_design_selected) {
      this.graphic_design_select_skills = true;
      this.skills_container = true;
    }

    if (this.it_support_selected) {
      this.it_support_select_skills = true;
      this.skills_container = true;
    }

    if (this.ui_ux_selected) {
      this.ui_ux_select_skills = true;
      this.skills_container = true;
    }

    if (this.admin_selected) {
      this.admin_select_skills = true;
      this.skills_container = true;
    }

    if (this.accounting_selected) {
      this.accounting_select_skills = true;
      this.skills_container = true;
    }

    if (this.sales_selected) {
      this.sales_security_select_skills = true;
      this.skills_container = true;
    }

    if (this.inbound_outbound_selected) {
      this.inbound_outbound_select_skills = true;
      this.skills_container = true;
    }

    if (this.lead_generation_selected) {
      this.lead_generation_select_skills = true;
      this.skills_container = true;
    }

    // if client didnt select anything
    if (!this.software_developement_selected && !this.cyber_security_selected && !this.digital_marketing_selected && !this.social_media_management_selected && !this.graphic_design_selected && !this.it_support_selected && !this.ui_ux_selected && !this.admin_selected && !this.accounting_selected && !this.sales_selected && !this.inbound_outbound_selected && !this.lead_generation_selected) {
      this.client_details = true;
    }


    this.initClient();

  }

  initClient() {
    this.lead = {
      _id: '',
      basicDetails: {
        client_name: this.new_client.client.name,
        phone: this.new_client.client.phone,
        email: this.new_client.client.email,
        website: ''
      },
      talent: this.new_client.talent,
      companyDetails: {
        hiringNeeds: '',
        seedOrVentureCapitalFunded: '',
        publiclyListedOrPostIPOCompany: '',
        currentEmployees: '',
        name_of_business: '',
        contact_person: '',
        business_overview: '',
      },
      qualifications: [],
      years_of_experience: '',
      job_type: '',
      age_preference: '',
      expected_start_date: '',
      notes: '',
      created_date: new Date(Date.now()).getTime() / 1000,
    }
  }

  Login() {
    const url = `/login`;
    this.router.navigate([url]);
  }

  SignUP() {
    const url = `/signup`;
    this.router.navigate([url]);

    this.data.changePage("developer")
  }

  MyAccount() {
    const url = `/profile/${this.user.id}`;
    this.router.navigate([url]);
  }

  AddSkill() {
    this.skills.push(this.skill.name);
    this.skill.name = '';
  }

  AddCyberSecuritySkill() {
    this.cyber_security_skills.push(this.cyber_security_skill.name);
    this.cyber_security_skill.name = '';
  }

  AddPreselectedSkill(skill: any) {
    this.preselected_skills.push(skill);
  }

  RemoveSkill(skill: any) {
    this.preselected_skills = this.preselected_skills.filter((value: any) => {
      return value !== skill;
    });
  }

  RemoveSelectedSkill(skill: any) {
    this.skills = this.skills.filter((value: any) => {
      return value !== skill;
    });
  }

  RemoveSelectedCyberSecuritySkill(skill: any) {
    this.cyber_security_skills = this.cyber_security_skills.filter((value: any) => {
      return value !== skill;
    });
  }


  AddDigitalMarketingSkill() {
    this.digital_marketing_skills.push(this.digital_marketing_skill.name);
    this.digital_marketing_skill.name = '';
  }

  RemoveDigitalMarketingSkill(skill: any) {
    this.digital_marketing_skills = this.digital_marketing_skills.filter((value: any) => {
      return value !== skill;
    });
  }

  AddSocialMediaSkill() {
    this.social_media_skills.push(this.social_media_skill.name);
    this.social_media_skill.name = '';
  }

  RemoveSocialMediaSkill(skill: any) {
    this.social_media_skills = this.social_media_skills.filter((value: any) => {
      return value !== skill;
    });
  }

  AddGraphicDesignSkill() {
    this.graphic_design_skills.push(this.graphic_design_skill.name);
    this.graphic_design_skill.name = '';
  }

  RemoveGraphicDesignSkill(skill: any) {
    this.graphic_design_skills = this.graphic_design_skills.filter((value: any) => {
      return value !== skill;
    });
  }


  AddItSupportSkill() {
    this.it_support_skills.push(this.it_support_skill.name);
    this.it_support_skill.name = '';
  }

  RemoveItSupportSkill(skill: any) {
    this.it_support_skills = this.it_support_skills.filter((value: any) => {
      return value !== skill;
    });
  }

  AddUiUxSkill() {
    this.ui_ux_skills.push(this.ui_ux_skill.name);
    this.ui_ux_skill.name = '';
  }

  RemoveUiUxSkill(skill: any) {
    this.ui_ux_skills = this.ui_ux_skills.filter((value: any) => {
      return value !== skill;
    });
  }

  AddAdminSkill() {
    this.admin_skills.push(this.admin_skill.name);
    this.admin_skill.name = '';
  }

  RemoveAdminSkill(skill: any) {
    this.admin_skills = this.admin_skills.filter((value: any) => {
      return value !== skill;
    });
  }

  AddAccountingSkill() {
    this.accounting_skills.push(this.accounting_skill.name);
    this.accounting_skill.name = '';
  }

  RemoveAccountingSkill(skill: any) {
    this.accounting_skills = this.accounting_skills.filter((value: any) => {
      return value !== skill;
    });
  }

  AddSalesSkill() {
    this.sales_skills.push(this.sales_skill.name);
    this.sales_skill.name = '';
  }

  RemoveSalesSkill(skill: any) {
    this.sales_skills = this.sales_skills.filter((value: any) => {
      return value !== skill;
    });
  }

  AddInboundOutboundSkill() {
    this.inbount_outbound_skills.push(this.inbound_outbound_skill.name);
    this.inbound_outbound_skill.name = '';
  }

  RemoveInboundOutboundSkill(skill: any) {
    this.inbount_outbound_skills = this.inbount_outbound_skills.filter((value: any) => {
      return value !== skill;
    });
  }

  AddLeadGenerationSkill() {
    this.lead_generation_skills.push(this.lead_generation_skill.name);
    this.lead_generation_skill.name = '';
  }

  RemoveLeadGenerationSkill(skill: any) {
    this.lead_generation_skills = this.lead_generation_skills.filter((value: any) => {
      return value !== skill;
    });
  }


  RevertPosition() {
    if (this.not_sure_color === false) {
      this.not_sure_color = true;

      this.AddPreselectedSkill('Not Sure');

    } else {
      this.not_sure_color = false;

      this.RemoveSkill('Not Sure');
    }
  }

  RevertReact() {
    if (this.react_color === false) {
      this.react_color = true;

      this.AddPreselectedSkill('React');
    } else {
      this.react_color = false;

      this.RemoveSkill('React')
    }
  }

  RevertNode() {
    if (this.node_color === false) {
      this.node_color = true;

      this.AddPreselectedSkill('Node.js');
    } else {
      this.node_color = false;

      this.RemoveSkill('Node.js');
    }
  }

  RevertPython() {
    if (this.python_color === false) {
      this.python_color = true;

      this.AddPreselectedSkill('Python');
    } else {
      this.python_color = false;

      this.RemoveSkill('Python');
    }
  }

  RevertAngular() {
    if (this.angular_color === false) {
      this.angular_color = true;

      this.AddPreselectedSkill('Angular');
    } else {
      this.angular_color = false;

      this.RemoveSkill('Angular');
    }
  }

  RevertReactNative() {
    if (this.react_native_color === false) {
      this.react_native_color = true;

      this.AddPreselectedSkill('React Native');
    } else {
      this.react_native_color = false;

      this.RemoveSkill('React Native');
    }
  }

  RevertAndroid() {
    if (this.android_color === false) {
      this.android_color = true;

      this.AddPreselectedSkill('Android');
    } else {
      this.android_color = false;

      this.RemoveSkill('Android');
    }
  }

  RevertJava() {
    if (this.java_color === false) {
      this.java_color = true;

      this.AddPreselectedSkill('Java');
    } else {
      this.java_color = false;

      this.RemoveSkill('Java');
    }
  }

  RevertGo() {
    if (this.go_color === false) {
      this.go_color = true;

      this.AddPreselectedSkill('Go');
    } else {
      this.go_color = false;

      this.RemoveSkill('Go');
    }
  }

  RevertVue() {
    if (this.vue_color === false) {
      this.vue_color = true;

      this.AddPreselectedSkill('Vue.js');
    } else {
      this.vue_color = false;

      this.RemoveSkill('Vue.js');
    }
  }

  RevertPhp() {
    if (this.php_color === false) {
      this.php_color = true;

      this.AddPreselectedSkill('PHP');
    } else {
      this.php_color = false;

      this.RemoveSkill('PHP');
    }
  }

  RevertTypescript() {
    if (this.typescript_color === false) {
      this.typescript_color = true;

      this.AddPreselectedSkill('Typescript');
    } else {
      this.typescript_color = false;

      this.RemoveSkill('Typescript');
    }
  }

  MergeSkills() {
    const promise: any = new Promise((resolve, reject) => {
      resolve([...this.preselected_skills, ...this.skills]);
    });
    return promise;
  }

  ContinueToFillDetails() {
    this.skills_container = false;

    this.MergeSkills().then((returned: any) => {
      this.combined_skills = returned;

      if (this.software_developement_selected) {
        const index = this.lead.talent.findIndex((object: any) => {
          return object.talent_name === 'Software Engineering';
        });
        this.lead.talent[index].skills = this.combined_skills
      }

      this.software_developement_select_skills = false;
      this.client_booking = false;
    });


    if (this.cyber_security_selected) {
      const index = this.lead.talent.findIndex((object: any) => {
        return object.talent_name === 'Cyber Security';
      });

      this.lead.talent[index].skills = this.cyber_security_skills
    }

    if (this.digital_marketing_selected) {
      const index = this.lead.talent.findIndex((object: any) => {
        return object.talent_name === 'Digital Marketing';
      });

      this.lead.talent[index].skills = this.digital_marketing_skills
    }

    if (this.social_media_management_selected) {
      const index = this.lead.talent.findIndex((object: any) => {
        return object.talent_name === 'Social Media Management';
      });

      this.lead.talent[index].skills = this.social_media_skills
    }

    if (this.graphic_design_selected) {
      const index = this.lead.talent.findIndex((object: any) => {
        return object.talent_name === 'Graphic Design/Illustration';
      });

      this.lead.talent[index].skills = this.graphic_design_skills
    }

    if (this.it_support_selected) {
      const index = this.lead.talent.findIndex((object: any) => {
        return object.talent_name === 'IT Support/Helpdesk';
      });

      this.lead.talent[index].skills = this.it_support_skills
    }

    if (this.ui_ux_selected) {
      const index = this.lead.talent.findIndex((object: any) => {
        return object.talent_name === 'UI/UX Design';
      });

      this.lead.talent[index].skills = this.ui_ux_skills
    }

    if (this.admin_selected) {
      const index = this.lead.talent.findIndex((object: any) => {
        return object.talent_name === 'Admin';
      });

      this.lead.talent[index].skills = this.admin_skills
    }

    if (this.accounting_selected) {
      const index = this.lead.talent.findIndex((object: any) => {
        return object.talent_name === 'Accounting/Bookkeeping';
      });

      this.lead.talent[index].skills = this.accounting_skills
    }

    if (this.sales_selected) {
      const index = this.lead.talent.findIndex((object: any) => {
        return object.talent_name === 'Sales/Marketing';
      });

      this.lead.talent[index].skills = this.sales_skills
    }

    if (this.inbound_outbound_selected) {
      const index = this.lead.talent.findIndex((object: any) => {
        return object.talent_name === 'Inbound/Outbound Calls';
      });

      this.lead.talent[index].skills = this.inbount_outbound_skills
    }

    if (this.lead_generation_selected) {
      const index = this.lead.talent.findIndex((object: any) => {
        return object.talent_name === 'LeadGeneration';
      });

      this.lead.talent[index].skills = this.lead_generation_skills
    }

    this.client_details = true;
  }

  BackToSkills() {
    this.skills_container = true;
    this.client_details = false;

    if (this.software_developement_selected) {
      this.software_developement_select_skills = true;
    }

    if (this.cyber_security_selected) {
      this.cyber_security_select_skills = true;
    }

    if (this.digital_marketing_selected) {
      this.digital_marketing_select_skills = true;
    }

    if (this.social_media_management_selected) {
      this.social_media_management_select_skills = true;
    }

    if (this.graphic_design_selected) {
      this.graphic_design_select_skills = true;
    }

    if (this.it_support_selected) {
      this.it_support_select_skills = true;
    }

    if (this.ui_ux_selected) {
      this.ui_ux_select_skills = true;
    }

    if (this.admin_selected) {
      this.admin_select_skills = true;
    }

    if (this.accounting_selected) {
      this.accounting_select_skills = true;
    }

    if (this.sales_selected) {
      this.sales_security_select_skills = true;
    }

    if (this.inbound_outbound_selected) {
      this.inbound_outbound_select_skills = true;
    }

    if (this.lead_generation_selected) {
      this.lead_generation_select_skills = true;
    }

    // if client didnt select anything
    if (!this.software_developement_selected && !this.cyber_security_selected && !this.digital_marketing_selected && !this.social_media_management_selected && !this.graphic_design_selected && !this.it_support_selected && !this.ui_ux_selected && !this.admin_selected && !this.accounting_selected && !this.sales_selected && !this.inbound_outbound_selected && !this.lead_generation_selected) {
      const url = `/clients`;
      this.router.navigate([url]);
    }
  }

  ContinueToFillClientDetails() {
    this.client_details = false;
    this.detailed_client_details = true;
  }

  BackToDetails() {
    this.client_details = true;
    this.detailed_client_details = false;
  }

  BackToHome() {
    const url = `/clients`;
    this.router.navigate([url]);
  }

  ContinueToBook() {
    this.lead.qualifications = this.qualifications.value
    this.lead.years_of_experience = this.yearsOfExperiences.value;
    this.lead.job_type = this.jobTypes.value;
    this.lead.age_preference = this.agePreferences.value;

    this.leadService.addLead(this.lead).subscribe(returened_lead => {
      this.client_details = false;
      this.software_developement_select_skills = false;
      this.client_booking = true;
      this.detailed_client_details = false;
    })
  }

  getHiringErrorMessage() {
    return "Select Option";
  }

  getSeedOrVentureErrorMessage() {
    return "Select Option";
  }

  getCompanyErrorMessage() {
    return "Select Option";
  }

  getEmployessErrorMessage() {
    return "Select Option";
  }

  getNameErrorMessage() {
    return "Enter your name";
  }

  getPhoneErrorMessage() {
    return "Enter your phone number";
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.client_subscription.unsubscribe();
  }
}
