import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Industry } from 'src/app/models/industry';
import { IndustryService } from 'src/app/services/industry.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-new-industry',
  templateUrl: './new-industry.component.html',
  styleUrls: ['./new-industry.component.scss']
})
export class NewIndustryComponent implements OnInit {

  public industry!: Industry;
  public onIndustryCreation = new EventEmitter();
  public maxDate: Date = new Date();
  public hide = true;

  constructor(
    private industryService: IndustryService,
    private dialogRef: MatDialogRef<NewIndustryComponent>,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.initIndustry();
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

  // add industry to database
  addIndustry(industry: Industry) {
    this.industryService.addIndustry(industry).subscribe(createdIndustry => {
      this.onIndustryCreation.emit(industry);

      if (createdIndustry) {
        this.notifier.Notification("success", "new industry successfully saved.");
        this.close();
      } else {
        this.notifier.Notification("warning", "failed to save.");
      }
    })
  }

  close() {
    this.dialogRef.close();
  }

}
