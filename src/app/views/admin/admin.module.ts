import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminUserComponent } from './users/admin-user/admin-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { ViewUserComponent } from './users/view-user/view-user.component';
import { ViewCandidateComponent } from './candidates/view-candidate/view-candidate.component';
import { AddDocumentComponent } from './candidates/add-document/add-document.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { EditDocumentComponent } from './candidates/edit-document/edit-document.component';
import { EditVacancyComponent } from './vacancies/edit-vacancy/edit-vacancy.component';
import { AddEducationComponent } from './candidates/add-education/add-education.component';
import { AddExperienceComponent } from './candidates/add-experience/add-experience.component';
import { AddMediaComponent } from './candidates/add-media/add-media.component';
import { AddSkillComponent } from './candidates/add-skill/add-skill.component';
import { CandidateInfoComponent } from './candidates/candidate-info/candidate-info.component';
import { CandidateComponent } from './candidates/candidate/candidate.component';
import { EditCandidateBioComponent } from './candidates/edit-candidate-bio/edit-candidate-bio.component';
import { EditCandidateProfessionalSummaryComponent } from './candidates/edit-candidate-professional-summary/edit-candidate-professional-summary.component';
import { EditCandidateSkillComponent } from './candidates/edit-candidate-skill/edit-candidate-skill.component';
import { EditCandidateComponent } from './candidates/edit-candidate/edit-candidate.component';
import { EditEducationComponent } from './candidates/edit-education/edit-education.component';
import { EditExperienceComponent } from './candidates/edit-experience/edit-experience.component';
import { EditMediaComponent } from './candidates/edit-media/edit-media.component';
import { NewCandidateComponent } from './candidates/new-candidate/new-candidate.component';
import { ViewAppliedCandidateComponent } from './candidates/view-applied-candidate/view-applied-candidate.component';
import { ClientInfoComponent } from './clients/client-info/client-info.component';
import { ClientComponent } from './clients/client/client.component';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { NewClientComponent } from './clients/new-client/new-client.component';
import { ViewClientComponent } from './clients/view-client/view-client.component';
import { UserInfoComponent } from './users/user-info/user-info.component';
import { UserComponent } from './users/user/user.component';
import { NewVacancyComponent } from './vacancies/new-vacancy/new-vacancy.component';
import { VacancyInfoComponent } from './vacancies/vacancy-info/vacancy-info.component';
import { VacancyComponent } from './vacancies/vacancy/vacancy.component';
import { ViewVacancyComponent } from './vacancies/view-vacancy/view-vacancy.component';
import { NotifierService } from 'src/app/services/notifier.service';
import { AdminGenerateCodeComponent } from './signin-signup/admin-generate-code/admin-generate-code.component';
import { UpdateAdminPasswordComponent } from './signin-signup/update-admin-password/update-admin-password.component';
import { VerifyAdminCodeComponent } from './signin-signup/verify-admin-code/verify-admin-code.component';
import { ResetAdminPasswordComponent } from './signin-signup/reset-admin-password/reset-admin-password.component';
import { AdminLoginComponent } from './signin-signup/admin-login/admin-login.component';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScriptComponent } from './candidates/script/script.component';
import { LeadComponent } from './clients/lead/lead.component';
import { LeadInfoComponent } from './clients/lead-info/lead-info.component';
import { EditLeadComponent } from './clients/edit-lead/edit-lead.component';
import { ViewLeadComponent } from './clients/view-lead/view-lead.component';
import { VacancyEmailDialogComponent } from './emails/vacancy-email-dialog/vacancy-email-dialog.component';
import { searchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { MatRadioModule } from '@angular/material/radio';
import { RoleChangeDialogComponent } from './candidates/role-change-dialog/role-change-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { QuillModule } from 'ngx-quill';
import { BlogComponent } from './blog/blog/blog.component';
import { BlogInfoComponent } from './blog/blog-info/blog-info.component';
import { BlogCategoryInfoComponent } from './blog/blog-category-info/blog-category-info.component';
import { NewBlogComponent } from './blog/new-blog/new-blog.component';
import { ViewBlogComponent } from './blog/view-blog/view-blog.component';
import { EditBlogComponent } from './blog/edit-blog/edit-blog.component';
import { EditBlogCategoryComponent } from './blog/edit-blog-category/edit-blog-category.component';
import { NewBlogCategoryComponent } from './blog/new-blog-category/new-blog-category.component';
import { AdminStaffComponent } from './staff/admin-staff/admin-staff.component';
import { EditStaffComponent } from './staff/edit-staff/edit-staff.component';
import { NewStaffComponent } from './staff/new-staff/new-staff.component';
import { StaffComponent } from './staff/staff/staff.component';
import { StaffInfoComponent } from './staff/staff-info/staff-info.component';
import { ViewStaffComponent } from './staff/view-staff/view-staff.component';



@NgModule({
  declarations: [
    CandidateComponent,
    NewCandidateComponent,
    CandidateInfoComponent,
    EditCandidateComponent,
    AdminUserComponent,
    UserComponent,
    UserInfoComponent,
    EditUserComponent,
    NewUserComponent,
    ViewUserComponent,
    ViewCandidateComponent,
    EditCandidateBioComponent,
    EditCandidateProfessionalSummaryComponent,
    EditExperienceComponent,
    EditEducationComponent,
    EditCandidateSkillComponent,
    AddEducationComponent,
    AddExperienceComponent,
    AddSkillComponent,
    AddMediaComponent,
    AddDocumentComponent,
    EditMediaComponent,
    EditDocumentComponent,
    NewVacancyComponent,
    EditVacancyComponent,
    VacancyInfoComponent,
    ViewVacancyComponent,
    VacancyComponent,
    ViewAppliedCandidateComponent,
    NewClientComponent,
    ViewClientComponent,
    ClientComponent,
    ClientInfoComponent,
    EditClientComponent,
    AdminGenerateCodeComponent,
    UpdateAdminPasswordComponent,
    VerifyAdminCodeComponent,
    ResetAdminPasswordComponent,
    AdminLoginComponent,
    ScriptComponent,
    LeadComponent,
    LeadInfoComponent,
    EditLeadComponent,
    ViewLeadComponent,
    VacancyEmailDialogComponent,
    searchFilterPipe,
    RoleChangeDialogComponent,
    BlogComponent,
    BlogInfoComponent,
    BlogCategoryInfoComponent,
    NewBlogComponent,
    ViewBlogComponent,
    EditBlogComponent,
    EditBlogCategoryComponent,
    NewBlogCategoryComponent,
    AdminStaffComponent,
    EditStaffComponent,
    NewStaffComponent,
    StaffComponent,
    StaffInfoComponent,
    ViewStaffComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxAudioPlayerModule,
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
    MatTabsModule,
    MatPaginatorModule,
    MatIconModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,
    MaterialFileInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatProgressBarModule,
    QuillModule.forRoot(),
  ],
  providers: [NotifierService]
})
export class AdminModule { }
