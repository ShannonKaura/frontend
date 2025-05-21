import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Industry } from 'src/app/models/industry';
import { IndustryService } from 'src/app/services/industry.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-edit-industry',
  templateUrl: './edit-industry.component.html',
  styleUrls: ['./edit-industry.component.scss']
})
export class EditIndustryComponent implements OnInit {

  public industry!: Industry;
  public maxDate: Date = new Date();
  public hide = true;

  constructor(
    private industryService: IndustryService,
    @Inject(MAT_DIALOG_DATA) public industrydatainfo: any,
    private dialogRef: MatDialogRef<EditIndustryComponent>,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.initIndustry();
    this.getIndustry();
  }

  // initialize industry model
  initIndustry() {
    this.industry = {
      _id: '',
      industry_name: '',
      original_industry_record: {},
      modified_industry_records: [],
      created_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
      delete: {},
    }
  }

  // get industry by Id
  getIndustry() {
    const industryId = this.industrydatainfo.id
    if (industryId) {
      this.industryService.getIndustryById(industryId).subscribe(returnedindustry => {
        this.industry = returnedindustry;
      })
    }
  }

  //update industry
  updateIndustry(industry: Industry) {
    this.industryService.updateIndustry(industry).subscribe(updatedIndustry => {
      this.industry = updatedIndustry;

      if (this.industry) {
        this.notifier.Notification("success", "industry successfully updated.");
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
