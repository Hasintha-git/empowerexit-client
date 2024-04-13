import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEmployeeProfileComponent } from './edit-employee-profile/edit-employee-profile.component';
import { EmployeeProfileComponent } from './employee-profile.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeProfileComponent,
  },
  {
    path: 'employee-profile',
    component: EmployeeProfileComponent,
  },
  {
    path: 'edit-employee-profile',
    component: EditEmployeeProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeProfileRoutingModule { }
