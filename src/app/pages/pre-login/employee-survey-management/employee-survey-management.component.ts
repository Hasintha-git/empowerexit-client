import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Survey } from 'src/app/models/survey';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-employee-survey-management',
  templateUrl: './employee-survey-management.component.html',
  styleUrls: ['./employee-survey-management.component.scss']
})
export class EmployeeSurveyManagementComponent implements OnInit {
  surveyModel = new Survey();
  employeeForm: FormGroup;
  constructor(private toastr: ToastServiceService,private spinner: NgxSpinnerService,private _snackBar: MatSnackBar,private formBuilder: FormBuilder,private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.initialValidator();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  initialValidator() {
    this.employeeForm = this.formBuilder.group({
      emp_id : this.formBuilder.control('', [Validators.required]),
      working_hours : this.formBuilder.control('', [Validators.required]),
      promotional_barriers : this.formBuilder.control('', [Validators.required]),
      work_life_balance : this.formBuilder.control('', [Validators.required]),
      status_and_recognition : this.formBuilder.control('', [Validators.required]),
      salary : this.formBuilder.control('', [Validators.required]),
      opportunities : this.formBuilder.control('', [Validators.required]),
      workload : this.formBuilder.control('', [Validators.required]),
      work_environment : this.formBuilder.control('', [Validators.required]),
      training_and_development : this.formBuilder.control('', [Validators.required]),
      relationship_with_colleagues : this.formBuilder.control('', [Validators.required]),
      relationship_with_supervisor : this.formBuilder.control('', [Validators.required]),
      job_satisfaction : this.formBuilder.control('', [Validators.required]),
      distance_from_home : this.formBuilder.control('', [Validators.required]),
      age : this.formBuilder.control('', [Validators.required]),
      gender : this.formBuilder.control('', [Validators.required]),
      marital_status : this.formBuilder.control('', [Validators.required]),
      educational_status : this.formBuilder.control('', [Validators.required]),
      total_years_industry : this.formBuilder.control('', [Validators.required]),
      years_work_current_hotel : this.formBuilder.control('', [Validators.required]),
      number_of_years_current_role : this.formBuilder.control('', [Validators.required]),
      last_promotion : this.formBuilder.control('', [Validators.required]),
      hotel_assess_performance : this.formBuilder.control('', [Validators.required]),
    });
    // Object.keys(this.employeeForm.controls).forEach(key => {
    //   const control = this.employeeForm.get(key);
    //   control.markAsTouched();
    // });
  }

  onSubmit() {
    this.spinner.show();
    if (this.employeeForm.valid) {
      this.employeeService.employeeSurveyRegister(this.surveyModel).subscribe((surveyResponse: any)=> {
        this.openSnackBar(surveyResponse.MESSAGE,surveyResponse.STATUS)
        this.employeeForm.reset();
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.toastr.errorMessage(error);
      }
      )
    } else {
      this.spinner.hide();
      this.mandatoryValidation(this.employeeForm)
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
    return this.employeeForm.get('emp_id');
  }

  get working_hours() {
    return this.employeeForm.get('working_hours');
  }

  get promotional_barriers() {
    return this.employeeForm.get('promotional_barriers');
  }

  get work_life_balance() {
    return this.employeeForm.get('work_life_balance');
  }

  get status_and_recognition() {
    return this.employeeForm.get('status_and_recognition');
  }

  get salary() {
    return this.employeeForm.get('salary');
  }

  get opportunities() {
    return this.employeeForm.get('opportunities');
  }

  get workload() {
    return this.employeeForm.get('workload');
  }

  get work_environment() {
    return this.employeeForm.get('work_environment');
  }

  get training_and_development() {
    return this.employeeForm.get('training_and_development');
  }

  get relationship_with_colleagues() {
    return this.employeeForm.get('relationship_with_colleagues');
  }

  get relationship_with_supervisor() {
    return this.employeeForm.get('relationship_with_supervisor');
  }

  get job_satisfaction() {
    return this.employeeForm.get('job_satisfaction');
  }

  get distance_from_home() {
    return this.employeeForm.get('distance_from_home');
  }

  get age() {
    return this.employeeForm.get('age');
  }

  get gender() {
    return this.employeeForm.get('gender');
  }

  get marital_status() {
    return this.employeeForm.get('marital_status');
  }

  get educational_status() {
    return this.employeeForm.get('educational_status');
  }

  get total_years_industry() {
    return this.employeeForm.get('total_years_industry');
  }

  get years_work_current_hotel() {
    return this.employeeForm.get('years_work_current_hotel');
  }

  get number_of_years_current_role() {
    return this.employeeForm.get('number_of_years_current_role');
  }

  get last_promotion() {
    return this.employeeForm.get('last_promotion');
  }

  get hotel_assess_performance() {
    return this.employeeForm.get('hotel_assess_performance');
  }
}
