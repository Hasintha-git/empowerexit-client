import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeProfileRoutingModule } from './employee-profile-routing.module';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EditEmployeeProfileComponent } from './edit-employee-profile/edit-employee-profile.component';
import { ProgressNotesComponent } from './edit-employee-profile/progress-notes/progress-notes.component';
import { AddEmployeeProfileComponent } from '../add-employee-profile/add-employee-profile.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    EditEmployeeProfileComponent,
    ProgressNotesComponent,
    AddEmployeeProfileComponent,
    DeleteEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeProfileRoutingModule,
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
    MatDatepickerModule,
  ]
})
export class EmployeeProfileModule { }
