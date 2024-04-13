import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/models/employee';
import { EmployeeResponse } from 'src/app/models/response/employee-response';
import { SimpleBase } from 'src/app/models/SimpleBase';
import { StorageService } from 'src/app/models/StorageService';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-employee-profile',
  templateUrl: './add-employee-profile.component.html',
  styleUrls: ['./add-employee-profile.component.scss']
})
export class AddEmployeeProfileComponent implements OnInit {
  employeeModel = new Employee();
  employeeForm: FormGroup;
  sessionUser:any;
  public PerformanceList: SimpleBase[];
  public DepartmentList: SimpleBase[];
  constructor(private router: Router,private datepipe: DatePipe,private toastr: ToastServiceService, private spinner: NgxSpinnerService,private _snackBar: MatSnackBar,private formBuilder: FormBuilder, private employeeService: EmployeeService,private storage: StorageService) { }

  ngOnInit(): void {
    this.sessionUser = this.storage.getItem("user");
    this.initialValidator();
    this.departments_list();
    this.performance_categories_list();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  initialValidator() {
    this.employeeForm = this.formBuilder.group({
      emp_id : this.formBuilder.control('', [Validators.required]),
      name : this.formBuilder.control('', [Validators.required]),
      joined_date : this.formBuilder.control('', [Validators.required]),
      designation : this.formBuilder.control('', [Validators.required]),
      department_id : this.formBuilder.control('', [Validators.required]),
      address : this.formBuilder.control('', [Validators.required]),
      supervisor : this.formBuilder.control('', [Validators.required]),
      contact : this.formBuilder.control('', [Validators.required]),
      performance_grade : this.formBuilder.control('', [Validators.required]),
    });
  }

  onSubmit() {
    const date = new Date(this.employeeModel.joined_date);
    this.spinner.show();

    if (this.employeeForm.valid) {
    const formattedDate = this.datepipe.transform(date, 'yyyy-MM-dd');
    this.employeeModel.joined_date=formattedDate;
      this.employeeService.employeeRegister(this.employeeModel,this.sessionUser).subscribe((employeeResponse: EmployeeResponse)=> {
        this.toastr.successMessage(employeeResponse.MESSAGE);
        this.spinner.hide();
        this.employeeForm.reset();
        this.resetFormControls(this.employeeForm);
        this.router.navigate(['/post-login/employee-analytics'])
      },
      error => {
        this.spinner.hide();
        this.toastr.errorMessage(error);
      })
    } else {
      this.toastr.errorMessage('Please fill in all required fields');
      this.spinner.hide();
      this.mandatoryValidation(this.employeeForm)
    }
  }

  resetFormControls(form: FormGroup) {
    Object.keys(form.controls).forEach(controlName => {
      const control = form.controls[controlName];
      control.reset();
      control.setErrors(null);
    });
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
    return this.employeeForm.get('emp_id');
  }

  get name() {
    return this.employeeForm.get('name');
  }

  get joined_date() {
    return this.employeeForm.get('joined_date');
  }

  get designation() {
    return this.employeeForm.get('designation');
  }

  get department_id() {
    return this.employeeForm.get('department_id');
  }

  get address() {
    return this.employeeForm.get('address');
  }

  get supervisor() {
    return this.employeeForm.get('supervisor');
  }

  get contact() {
    return this.employeeForm.get('contact');
  }

  get performance_grade() {
    return this.employeeForm.get('performance_grade');
  }

}
