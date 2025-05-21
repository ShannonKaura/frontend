import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CompanyDepartment } from 'src/app/models/company-department';
import { NotifierService } from 'src/app/services/notifier.service';
import { CompanyDepartmentService } from 'src/app/services/company-department.service';

@Component({
  selector: 'app-new-company-department',
  templateUrl: './new-company-department.component.html',
  styleUrls: ['./new-company-department.component.scss']
})
export class NewCompanyDepartmentComponent implements OnInit {

  public companyDepartment!: CompanyDepartment;
  public onCompanyDepartmentCreation = new EventEmitter();
  public maxDate: Date = new Date();
  public hide = true;

  constructor(
    private companyDepartmentService: CompanyDepartmentService,
    private dialogRef: MatDialogRef<NewCompanyDepartmentComponent>,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.initCompanyDepartment();
  }


  // initialize companyDepartment model
  initCompanyDepartment() {
    this.companyDepartment = {
      _id: '',
      department_name: '',
      created_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
    }
  }

  // add companyDepartment to database
  addCompanyDepartment(companyDepartment: CompanyDepartment) {
    this.companyDepartmentService.addCompanyDepartment(companyDepartment).subscribe(createdCompanyDepartment => {
      this.onCompanyDepartmentCreation.emit(companyDepartment);

      if (createdCompanyDepartment) {
        this.notifier.Notification("success", "new companyDepartment successfully saved.");
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
