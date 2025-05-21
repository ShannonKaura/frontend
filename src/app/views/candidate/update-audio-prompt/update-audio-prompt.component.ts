import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-update-audio-prompt',
  templateUrl: './update-audio-prompt.component.html',
  styleUrls: ['./update-audio-prompt.component.scss']
})
export class UpdateAudioPromptComponent implements OnInit {

  public user_id: any;
  
  constructor(
    private dialogRef: MatDialogRef<UpdateAudioPromptComponent>,
    private router: Router,
    private tokenStorageService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.user_id = this.tokenStorageService.getUser().id;
  }

  close() {
    const url = `/profile/${this.user_id}`;
    this.router.navigate([url]);
    this.dialogRef.close();
  }

}
