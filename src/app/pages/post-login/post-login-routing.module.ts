import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '../pre-login/sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeAnalyticsComponent } from './employee-analytics/employee-analytics.component';
import { PostLoginComponent } from './post-login.component';
import { DepartmentalInsightsComponent } from './departmental-insights/departmental-insights.component';

const routes: Routes = [
  {path:'',component:PostLoginComponent, children:[
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard',component:DashboardComponent},
    {
      path: 'employee-analytics',
      loadChildren: () => import('./employee-analytics/employee-analytics.module').then(m => m.EmployeeAnalyticsModule),
    },
    {path: 'departmental-insights',component:DepartmentalInsightsComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostLoginRoutingModule { }
