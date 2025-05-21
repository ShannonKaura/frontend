import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AccessLevel } from 'src/app/models/access-level';
import { NotifierService } from 'src/app/services/notifier.service';
import { AccessLevelService } from 'src/app/services/access-level.service';

@Component({
  selector: 'app-new-access-level',
  templateUrl: './new-access-level.component.html',
  styleUrls: ['./new-access-level.component.scss']
})
export class NewAccessLevelComponent implements OnInit {

  public accessLevel!: AccessLevel;
  public onAccessLevelCreation = new EventEmitter();
  public maxDate: Date = new Date();
  public hide = true;

  constructor(
    private accessLevelService: AccessLevelService,
    private dialogRef: MatDialogRef<NewAccessLevelComponent>,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.initAccessLevel();
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

  // add accessLevel to database
  addAccessLevel(accessLevel: AccessLevel) {
    this.accessLevelService.addAccessLevel(accessLevel).subscribe(createdAccessLevel => {
      this.onAccessLevelCreation.emit(accessLevel);

      if (createdAccessLevel) {
        this.notifier.Notification("success", "new accessLevel successfully saved.");
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
