import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-document-modal',
  templateUrl: './add-document-modal.component.html',
  styleUrls: ['./add-document-modal.component.scss']
})
export class AddDocumentModalComponent implements OnInit {
  public is_sales_agent: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AddDocumentModalComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public vacancydatainfo: any,
    private tokenStorageService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    if (this.vacancydatainfo.name === "Sales advisor/Call agent") {
      this.is_sales_agent = true;
    }
  }

  close() {
    const url = `profile/${this.tokenStorageService.getUser().id}`;
    this.router.navigate([url]);
    this.dialogRef.close();
  }

}
