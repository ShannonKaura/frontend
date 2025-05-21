import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccessLevel } from 'src/app/models/access-level';
import { AccessLevelService } from 'src/app/services/access-level.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-edit-access-level',
  templateUrl: './edit-access-level.component.html',
  styleUrls: ['./edit-access-level.component.scss']
})
export class EditAccessLevelComponent implements OnInit {

  public accessLevel!: AccessLevel;
  public maxDate: Date = new Date();
  public hide = true;

  constructor(
    private accessLevelService: AccessLevelService,
    @Inject(MAT_DIALOG_DATA) public accessLeveldatainfo: any,
    private dialogRef: MatDialogRef<EditAccessLevelComponent>,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.initAccessLevel();
    this.getAccessLevel();
  }

  // initialize accessLevel model
  initAccessLevel() {
    this.accessLevel = {
      _id: '',
      role_name: '',
      original_access_level_record: {},
      modified_access_level_records: [],
      created_by: '',
      created_date: new Date(Date.now()).getTime() / 1000,
      delete: {},
    }
  }

  // get accessLevel by Id
  getAccessLevel() {
    const accessLevelId = this.accessLeveldatainfo.id
    if (accessLevelId) {
      this.accessLevelService.getAccessLevelById(accessLevelId).subscribe(returned => {
        this.accessLevel = returned;

        console.log('xxxxxxxxx', returned)
      })
    }
  }

  //update accessLevel
  updateAccessLevel(accessLevel: AccessLevel) {
    this.accessLevelService.updateAccessLevel(accessLevel).subscribe(updatedAccessLevel => {
      this.accessLevel = updatedAccessLevel;

      if (this.accessLevel) {
        this.notifier.Notification("success", "accessLevel successfully updated.");
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
