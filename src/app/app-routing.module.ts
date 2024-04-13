import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostLoginModule } from './pages/post-login/post-login.module';
import { EmployeeSurveyManagementComponent } from './pages/pre-login/employee-survey-management/employee-survey-management.component';
import { SignInComponent } from './pages/pre-login/sign-in/sign-in.component';
import { SignUpComponent } from './pages/pre-login/sign-up/sign-up.component';
import { DashboardComponent } from './pages/post-login/dashboard/dashboard.component';
import { PostLoginComponent } from './pages/post-login/post-login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: SignInComponent,
  },
  {
    path: 'exitpredict/register',
    component: SignUpComponent,
  },
  {
    path: 'employee-survey-management',
    component: EmployeeSurveyManagementComponent,
  },
  {
    path: 'post-login',
    loadChildren: () => PostLoginModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
