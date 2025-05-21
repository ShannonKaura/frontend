import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainBodyComponent } from 'src/app/layouts/candidate-layout/main-body/main-body.component';
import { ClientRecruitmentLandingComponent } from './client-recruitment-landing/client-recruitment-landing.component';


const ClientRecruitmentRoutingRoutes: Routes = [
    {
        path: 'client-rectruitment-form', component: ClientRecruitmentLandingComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(ClientRecruitmentRoutingRoutes)],
    exports: [RouterModule]
})
export class ClientRecruitmentRoutingRoutingModule { }
