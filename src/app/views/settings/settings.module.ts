import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NewCountryComponent } from './new-country/new-country.component';
import { CountryInfoComponent } from './country-info/country-info.component';
import { EditCountryComponent } from './edit-country/edit-country.component';
import { SettingsComponent } from './settings/settings.component';
import { NewIndustryComponent } from './new-industry/new-industry.component';
import { EditIndustryComponent } from './edit-industry/edit-industry.component';
import { IndustryInfoComponent } from './industry-info/industry-info.component';
import { JobInfoComponent } from './job-info/job-info.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { NewJobComponent } from './new-job/new-job.component';
import { AccessLevelInfoComponent } from './access-level-info/access-level-info.component';
import { EditAccessLevelComponent } from './edit-access-level/edit-access-level.component';
import { NewAccessLevelComponent } from './new-access-level/new-access-level.component';
import { CompanyDepartmentInfoComponent } from './company-department-info/company-department-info.component';
import { EditCompanyDepartmentComponent } from './edit-company-department/edit-company-department.component';
import { NewCompanyDepartmentComponent } from './new-company-department/new-company-department.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    NewCountryComponent,
    CountryInfoComponent,
    EditCountryComponent,
    SettingsComponent,
    NewIndustryComponent,
    EditIndustryComponent,
    IndustryInfoComponent,
    JobInfoComponent,
    EditJobComponent,
    NewJobComponent,
    AccessLevelInfoComponent,
    EditAccessLevelComponent,
    NewAccessLevelComponent,
    CompanyDepartmentInfoComponent,
    EditCompanyDepartmentComponent,
    NewCompanyDepartmentComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    // MatModules
    MatTabsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatListModule,
    MatDialogModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ]
})
export class SettingsModule { }
