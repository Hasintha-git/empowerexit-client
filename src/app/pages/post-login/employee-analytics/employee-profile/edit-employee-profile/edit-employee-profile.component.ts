import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeResponse } from 'src/app/models/response/employee-response';
import { SimpleBase } from 'src/app/models/SimpleBase';
import { StorageService } from 'src/app/models/StorageService';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { ProgressNotesComponent } from './progress-notes/progress-notes.component';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastServiceService } from 'src/app/services/toast-service.service';
@Component({
  selector: 'app-edit-employee-profile',
  templateUrl: './edit-employee-profile.component.html',
  styleUrls: ['./edit-employee-profile.component.scss']
})
export class EditEmployeeProfileComponent implements OnInit {

  employeeModel = new Employee();
  editEmployeeForm: FormGroup;
  sessionUser:any;
  employeeId: any;

  public PerformanceList: SimpleBase[];
  public DepartmentList: SimpleBase[];
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder, 
    private employeeService: EmployeeService,
    private storage: StorageService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastServiceService,
    private spinner: NgxSpinnerService,
  ) { 
    this.route.queryParams.subscribe(params => {
      this.employeeId = params['id'];
    });
  }

  ngOnInit(): void {
    this._prepare();
  }
  _prepare() {
    this.sessionUser = this.storage.getItem("user");
    this.initialValidator();
    this.getEmployeeDetails();
    this.departments_list();
    this.performance_categories_list();
  }

  // progressNoteDialog() {
  //   console.log('clicked')
  //   const dialogRef = this.dialog.open(ProgressNotesComponent, {
  //     data: this.employeeModel.note,
  //     panelClass: 'my-dialog'
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.employeeModel.note = result
  //   });

  // }

  initialValidator() {
    this.editEmployeeForm = this.formBuilder.group({
      emp_id : this.formBuilder.control('', [Validators.required]),
      name : this.formBuilder.control('', [Validators.required]),
      joined_date : this.formBuilder.control('', [Validators.required]),
      designation : this.formBuilder.control('', [Validators.required]),
      department_id : this.formBuilder.control('', [Validators.required]),
      address : this.formBuilder.control('', [Validators.required]),
      supervisor : this.formBuilder.control('', [Validators.required]),
      contact : this.formBuilder.control('', [Validators.required]),
      performance_grade : this.formBuilder.control('', [Validators.required]),
      notes : this.formBuilder.control(''),
    });
  }

  deleteEmployee() {
    this.dialog.open(DeleteEmployeeComponent, {
      data: this.employeeId,
      panelClass: 'my-dialog'
    });

  }

  getEmployeeDetails() {
    this.employeeService.getEmployeeDetails(this.sessionUser,this.employeeId).subscribe((employeeResponse: any)=> {
      // this.toastr.successMessage(employeeResponse.msg)
      this.employeeModel = employeeResponse.data.employee_details;
    },
    error => {
      this.spinner.hide();
      this.toastr.errorMessage(error);
    })
  }

  departments_list() {
    this.employeeService.departments(this.sessionUser).subscribe((data: any) => {
      this.DepartmentList = data.data.department_details;
    })
  }

  performance_categories_list() {
    this.employeeService.performance_categories(this.sessionUser).subscribe((data: any) => {
      this.PerformanceList = data.data.performance_categories;
    })
  }

  onSubmit() {
    this.spinner.show();
    if (this.editEmployeeForm.valid) {
      this.employeeModel.department_id=this.employeeModel.department_code;
      this.employeeService.updateEmployee(this.employeeModel,this.sessionUser).subscribe((employeeResponse: EmployeeResponse)=> {
        this.toastr.successMessage(employeeResponse.MESSAGE)
        this.getEmployeeDetails();
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.toastr.errorMessage(error);
      })
    } else {
      this.toastr.errorMessage('Please fill in all required fields');
      this.spinner.hide();
      this.mandatoryValidation(this.editEmployeeForm)
    }
  }

  mandatoryValidation(formGroup: FormGroup) {
    // this.isEmptyThumbnail = false;
    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control: FormControl = <FormControl> formGroup.controls[key];
        if (Object.keys(control).includes('controls')) {
          const formGroupChild: FormGroup = <FormGroup> formGroup.controls[key];
          this.mandatoryValidation(formGroupChild);

        }
        control.markAsTouched();
      }
    }
  }


  get emp_id() {
    return this.editEmployeeForm.get('emp_id');
  }

  get name() {
    return this.editEmployeeForm.get('name');
  }

  get joined_date() {
    return this.editEmployeeForm.get('joined_date');
  }

  get designation() {
    return this.editEmployeeForm.get('designation');
  }

  get department_id() {
    return this.editEmployeeForm.get('department_id');
  }

  get address() {
    return this.editEmployeeForm.get('address');
  }

  get supervisor() {
    return this.editEmployeeForm.get('supervisor');
  }

  get contact() {
    return this.editEmployeeForm.get('contact');
  }

  get performance_grade() {
    return this.editEmployeeForm.get('performance_grade');
  }

  get notes() {
    return this.editEmployeeForm.get('notes');
  }

}
