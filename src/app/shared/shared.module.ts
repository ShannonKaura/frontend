import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { DragDropFileUploadDirective } from '../directives/drag-drop-file-upload.directive';
import { EqualValidator } from '../directives/equal-validator.directive';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';



@NgModule({
  declarations: [
    EqualValidator,
    DragDropFileUploadDirective,
    ConfirmDialogComponent,
    ProgressSpinnerComponent,
  ],
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
  exports: [
    EqualValidator,
    ProgressSpinnerComponent,
  ]
})
export class SharedModule { }
