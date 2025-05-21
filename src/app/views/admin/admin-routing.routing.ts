import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/admin-layout/admin-layout.component';
import { AdminGuardService } from 'src/app/services/admin-guard.service';
import { CandidateLandingComponent } from '../candidate/website/candidate-landing/candidate-landing.component';
import { SettingsComponent } from '../settings/settings/settings.component';
import { BlogComponent } from './blog/blog/blog.component';
import { EditBlogComponent } from './blog/edit-blog/edit-blog.component';
import { CandidateComponent } from './candidates/candidate/candidate.component';
import { EditCandidateComponent } from './candidates/edit-candidate/edit-candidate.component';
import { ScriptComponent } from './candidates/script/script.component';
import { ClientComponent } from './clients/client/client.component';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { EditLeadComponent } from './clients/edit-lead/edit-lead.component';
import { LeadComponent } from './clients/lead/lead.component';
import { EditStaffComponent } from './staff/edit-staff/edit-staff.component';
import { StaffComponent } from './staff/staff/staff.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UserComponent } from './users/user/user.component';
import { EditVacancyComponent } from './vacancies/edit-vacancy/edit-vacancy.component';
import { VacancyComponent } from './vacancies/vacancy/vacancy.component';

const AdminRoutes: Routes = [
    {
        path: '', component: CandidateLandingComponent,
    },

    {
        path: '', component: AdminLayoutComponent, children: [
            {
                path: 'candidates', component: CandidateComponent, canActivate: [AdminGuardService]
            },

            {
                path: 'vacancies', component: VacancyComponent, canActivate: [AdminGuardService]
            },

            {
                path: 'vacancies/:id', component: EditVacancyComponent, canActivate: [AdminGuardService]
            },

            {
                path: 'admin', component: UserComponent, canActivate: [AdminGuardService]
            },
            {
                path: 'staff', component: StaffComponent, canActivate: [AdminGuardService]
            },
            {
                path: 'staff/:id', component: EditStaffComponent, canActivate: [AdminGuardService]
            },
            {
                path: 'admin/:id', component: EditUserComponent, canActivate: [AdminGuardService]
            },
            {
                path: 'candidate/:id', component: EditCandidateComponent, canActivate: [AdminGuardService]
            },
            {
                path: 'leads', component: LeadComponent, canActivate: [AdminGuardService]
            },
            {
                path: 'leads/:id', component: EditLeadComponent, canActivate: [AdminGuardService]
            },
            {
                path: 'clients', component: ClientComponent, canActivate: [AdminGuardService]
            },
            {
                path: 'clients/:id', component: EditClientComponent, canActivate: [AdminGuardService]
            },
            {
                path: 'settings', component: SettingsComponent, canActivate: [AdminGuardService]
            },
            {
                path: 'script', component: ScriptComponent, canActivate: [AdminGuardService]
            },

            {
                path: 'blog', component: BlogComponent, canActivate: [AdminGuardService]
            },
            {
                path: 'blog/:id', component: EditBlogComponent, canActivate: [AdminGuardService]
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(AdminRoutes),
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
