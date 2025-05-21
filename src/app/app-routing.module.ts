import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGenerateCodeComponent } from './views/admin/signin-signup/admin-generate-code/admin-generate-code.component';
import { AdminLoginComponent } from './views/admin/signin-signup/admin-login/admin-login.component';
import { UpdateAdminPasswordComponent } from './views/admin/signin-signup/update-admin-password/update-admin-password.component';
import { VerifyAdminCodeComponent } from './views/admin/signin-signup/verify-admin-code/verify-admin-code.component';
import { CandidateGenerateCodeComponent } from './views/candidate/signin-signup/candidate-generate-code/candidate-generate-code.component';
import { CandidateLoginComponent } from './views/candidate/signin-signup/candidate-login/candidate-login.component';
import { CandidateSignupComponent } from './views/candidate/signin-signup/candidate-signup/candidate-signup.component';
import { PrivacyPolicyComponent } from './views/candidate/signin-signup/privacy-policy/privacy-policy.component';
import { UpdateCandidatePasswordComponent } from './views/candidate/signin-signup/update-candidate-password/update-candidate-password.component';
import { UserAgreementComponent } from './views/candidate/signin-signup/user-agreement/user-agreement.component';
import { VerifyCandidateCodeComponent } from './views/candidate/signin-signup/verify-candidate-code/verify-candidate-code.component';
import { CandidateLandingComponent } from './views/candidate/website/candidate-landing/candidate-landing.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: CandidateLandingComponent,
  },
  {
    path: 'signup', component: CandidateSignupComponent,
  },
  {
    path: 'login', component: CandidateLoginComponent,
  },
  {
    path: 'candidate-request-password-reset', component: CandidateGenerateCodeComponent,
  },
  {
    path: 'verify-candidate-code/:email', component: VerifyCandidateCodeComponent,
  },
  {
    path: 'update-candidate-password/:email', component: UpdateCandidatePasswordComponent,
  },
  {
    path: 'signup', component: CandidateSignupComponent,
  },
  {
    path: 'user-agreement', component: UserAgreementComponent,
  },
  {
    path: 'privacy-policy', component: PrivacyPolicyComponent,
  },

  // admin
  {
    path: 'admin-login', component: AdminLoginComponent,
  },

  {
    path: 'request-password-reset', component: AdminGenerateCodeComponent,
  },
  {
    path: 'verify-admin-code', component: VerifyAdminCodeComponent,
  },
  {
    path: 'update-admin-password', component: UpdateAdminPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
