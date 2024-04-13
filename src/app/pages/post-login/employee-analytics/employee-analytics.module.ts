import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EmployeeAnalyticsRoutingModule } from './employee-analytics-routing.module';
import { EmployeeAnalyticsComponent } from './employee-analytics.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
@NgModule({
  declarations: [
    EmployeeAnalyticsComponent,
    EmployeeProfileComponent
  ],
  imports: [
    CommonModule,
    EmployeeAnalyticsRoutingModule,
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
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatDatepickerModule,
  ],
  providers: [DatePipe],
})
export class EmployeeAnalyticsModule { }
