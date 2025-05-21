import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyDepartment } from 'src/app/models/company-department';
import { CompanyDepartmentService } from 'src/app/services/company-department.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-edit-company-department',
  templateUrl: './edit-company-department.component.html',
  styleUrls: ['./edit-company-department.component.scss']
})
export class EditCompanyDepartmentComponent implements OnInit {

  public companyDepartment!: CompanyDepartment;
  public maxDate: Date = new Date();
  public hide = true;

  constructor(
    private companyDepartmentService: CompanyDepartmentService,
    @Inject(MAT_DIALOG_DATA) public companyDepartmentdatainfo: any,
    private dialogRef: MatDialogRef<EditCompanyDepartmentComponent>,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.initCompanyDepartment();
    this.getCompanyDepartment();
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

  // get companyDepartment by Id
  getCompanyDepartment() {
    const companyDepartmentId = this.companyDepartmentdatainfo.id
    if (companyDepartmentId) {
      this.companyDepartmentService.getCompanyDepartmentById(companyDepartmentId).subscribe(returned => {
        this.companyDepartment = returned;

        console.log('xxxxxxxxx', returned)
      })
    }
  }

  //update companyDepartment
  updateCompanyDepartment(companyDepartment: CompanyDepartment) {
    this.companyDepartmentService.updateCompanyDepartment(companyDepartment).subscribe(updatedCompanyDepartment => {
      this.companyDepartment = updatedCompanyDepartment;

      if (this.companyDepartment) {
        this.notifier.Notification("success", "companyDepartment successfully updated.");
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
