import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateLandingComponent } from './website/candidate-landing/candidate-landing.component';
import { RouterModule } from '@angular/router';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CandidateRoutingModule } from './candidate-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CandidateGenerateCodeComponent } from './signin-signup/candidate-generate-code/candidate-generate-code.component';
import { CandidateLoginComponent } from './signin-signup/candidate-login/candidate-login.component';
import { CandidateSignupComponent } from './signin-signup/candidate-signup/candidate-signup.component';
import { ProceedOptionComponent } from './signin-signup/proceed-option/proceed-option.component';
import { UpdateCandidatePasswordComponent } from './signin-signup/update-candidate-password/update-candidate-password.component';
import { UserAgreementComponent } from './signin-signup/user-agreement/user-agreement.component';
import { VerifyCandidateCodeComponent } from './signin-signup/verify-candidate-code/verify-candidate-code.component';
import { PrivacyPolicyComponent } from './signin-signup/privacy-policy/privacy-policy.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLineModule, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileComponent } from './profile/profile.component';
import { AddDocumentModalComponent } from './add-document-modal/add-document-modal.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { AddEducationComponent } from './add-education/add-education.component';
import { AddExperienceComponent } from './add-experience/add-experience.component';
import { AddMediaComponent } from './add-media/add-media.component';
import { AddSkillComponent } from './add-skill/add-skill.component';
import { AddStatusComponent } from './add-status/add-status.component';
import { CandidateUserComponent } from './candidate-user/candidate-user.component';
import { ClientLandingComponent } from './client-landing/client-landing.component';
import { DeveloperLandingComponent } from './developer-landing/developer-landing.component';
import { EditDocumentComponent } from './edit-document/edit-document.component';
import { EditMediaComponent } from './edit-media/edit-media.component';
import { EditStatusComponent } from './edit-status/edit-status.component';
import { HireComponent } from './hire/hire.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { UpdateAudioPromptComponent } from './update-audio-prompt/update-audio-prompt.component';
import { UpdateAvailabilityComponent } from './update-availability/update-availability.component';
import { UpdateCandidateBioComponent } from './update-candidate-bio/update-candidate-bio.component';
import { UpdateCandidateContactComponent } from './update-candidate-contact/update-candidate-contact.component';
import { UpdateCandidateProfessionalSummaryComponent } from './update-candidate-professional-summary/update-candidate-professional-summary.component';
import { UpdateCandidateSkillComponent } from './update-candidate-skill/update-candidate-skill.component';
import { UpdateEducationComponent } from './update-education/update-education.component';
import { UpdateExperienceComponent } from './update-experience/update-experience.component';
import { UpdateProfilePromptComponent } from './update-profile-prompt/update-profile-prompt.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { ViewSelectedVacancyComponent } from './view-selected-vacancy/view-selected-vacancy.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { SharingDataService } from 'src/app/services/sharing-data.service';
import { GuestProfileComponent } from './guest-profile/guest-profile.component';
import { QuillModule } from 'ngx-quill';
import { GuestCreatePasswordComponent } from './guest-create-password/guest-create-password.component';


@NgModule({
  declarations: [
    CandidateLandingComponent,
    CandidateGenerateCodeComponent,
    CandidateLoginComponent,
    CandidateSignupComponent,
    ProceedOptionComponent,
    UpdateCandidatePasswordComponent,
    UserAgreementComponent,
    VerifyCandidateCodeComponent,
    PrivacyPolicyComponent,
    ProfileComponent,
    CandidateUserComponent,
    UpdateCandidateBioComponent,
    UpdateCandidateProfessionalSummaryComponent,
    UpdateAvailabilityComponent,
    AddExperienceComponent,
    UpdateCandidateContactComponent,
    AddSkillComponent,
    AddEducationComponent,
    UpdateExperienceComponent,
    UpdateEducationComponent,
    UpdateCandidateSkillComponent,
    VacanciesComponent,
    AddMediaComponent,
    EditMediaComponent,
    EditDocumentComponent,
    AddDocumentComponent,
    AddStatusComponent,
    EditStatusComponent,
    AddDocumentModalComponent,
    LoginModalComponent,
    ViewSelectedVacancyComponent,
    UpdateAudioPromptComponent,
    UpdateProfilePromptComponent,
    DeveloperLandingComponent,
    HireComponent,
    ClientLandingComponent,
    GuestProfileComponent,
    GuestCreatePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CandidateRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ScrollingModule,
    NgxAudioPlayerModule,
    MaterialFileInputModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule,
    MatButtonModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatLineModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatRadioModule,
    MatTooltipModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    QuillModule.forRoot()
  ],
  providers: [Meta, MatDatepickerModule, SharingDataService],
})
export class CandidateModule { }
