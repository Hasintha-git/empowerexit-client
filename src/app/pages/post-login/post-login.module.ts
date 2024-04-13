import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostLoginRoutingModule } from './post-login-routing.module';
import { PostLoginComponent } from './post-login.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeAnalyticsComponent } from './employee-analytics/employee-analytics.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { ShareSurveyComponent } from './share-survey/share-survey.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { DepartmentalInsightsComponent } from './departmental-insights/departmental-insights.component';
@NgModule({
  declarations: [
    PostLoginComponent,
    DashboardComponent,
    ShareSurveyComponent,
    DepartmentalInsightsComponent
  ],
  imports: [
    CommonModule,
    PostLoginRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatSidenavModule,
    MatMenuModule,
    MatDialogModule,
    MatGridListModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    FormsModule,
    MatInputModule,
    MatRadioModule,
    ClipboardModule
  ]
})
export class PostLoginModule { }
