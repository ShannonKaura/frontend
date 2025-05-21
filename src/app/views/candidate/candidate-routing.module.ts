import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainBodyComponent } from 'src/app/layouts/candidate-layout/main-body/main-body.component';
import { CandidateGuardService } from 'src/app/services/candidate-guard.service';
import { GuestCreatePasswordComponent } from './guest-create-password/guest-create-password.component';
import { GuestProfileComponent } from './guest-profile/guest-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { ViewSelectedVacancyComponent } from './view-selected-vacancy/view-selected-vacancy.component';
import { CandidateLandingComponent } from './website/candidate-landing/candidate-landing.component';


const CandidateRoutes: Routes = [
    {
        path: '', component: CandidateLandingComponent,
    },

    {
        path: '', component: MainBodyComponent, children: [
            {
                path: 'profile/:id', component: ProfileComponent, canActivate: [CandidateGuardService]
            },
            {
                path: 'jobs', component: VacanciesComponent
            },
            {
                path: 'jobs/:id', component: ViewSelectedVacancyComponent
            },
            {
                path: 'create-profile/:vacancy_id', component: GuestProfileComponent
            },
            {
                path: 'create-password/:id', component: GuestCreatePasswordComponent
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(CandidateRoutes)],
    exports: [RouterModule]
})
export class CandidateRoutingModule { }
