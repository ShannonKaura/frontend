import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainBodyComponent } from './main-body/main-body.component';
import { CandidateLayoutRoutingModule } from './candidate-layout.routing';
import { CandidateModule } from 'src/app/views/candidate/candidate.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    MainBodyComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    CandidateModule,
    CandidateLayoutRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
  ]
})
export class CandidateLayoutModule { }
