import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAnalyticsComponent } from './employee-analytics.component';
import {AddEmployeeProfileComponent} from "./add-employee-profile/add-employee-profile.component";

const routes: Routes = [
  {
    path: '',
    component: EmployeeAnalyticsComponent,
  },
  {
    path: 'employee-profile',
    loadChildren: () => import('./employee-profile/employee-profile.module').then(m => m.EmployeeProfileModule)
  },
  {
    path: 'add-employee',
    component: AddEmployeeProfileComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeAnalyticsRoutingModule { }
