import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { StorageService } from 'src/app/models/StorageService';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { ProgressNotesComponent } from './edit-employee-profile/progress-notes/progress-notes.component';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastServiceService } from 'src/app/services/toast-service.service';
import { NODATA } from 'src/app/utility/constants/end-point';
import { NODATA1 } from 'src/app/utility/constants/end-point';
export interface Drivers {
  name: string;
  rate: number;
}

export interface prev_pred_factors {
  factor: string;
  rate: number;
  is_rate_increased: boolean;
}

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  employeeModel = new Employee();

  analyticsPeriod:any;
  prev_period:any;
  current_period:any;
  is_drivers_exists:boolean;

  //Turnover Analytics -table 1
  drivers : Drivers[];
  turnOverProbability: string;
  relentionPeriod: string;

  // table 2
  measures:[];

  //Turnover Analytics Impact Rates
  monthlySalaryRate: string;
  jobSatisfactionRate: string;
  workloadRate: string;
  supervisorRelationshipRate: string;

  //mat icon list
  arrow_upward='arrow_upward';
  arrow_downward='arrow_downward';

  //Increase in Turnover Probability
  arrow_icon_turnOver_prob: string;
  rate_turnOver_prob: string;
  currentRate: string;
  previousRate: string;

  //Decrease in Relention Period
  arrow_icon_relention_perod: string;
  year_relention_perod: string;
  currentYear: string;
  previousYear: string;
  is_prev_factors_exists: boolean;
  
  //Turnover Driver impact
  driverImpact:prev_pred_factors[];
  arrow_icon_turnOverIncreaseMonthRate: string;
  arrow_icon_turnOverDecreaseWeekRate: string;
  turnOverIncreaseMonthRate: string;
  turnOverDecreaseWeekRate: string;


  //edit part enable or view part enable
  viewOrEditModeEnable: boolean;

  employeeId: any;
  sessionUser:any;

  nodata : any;
  nodata1:any;
  isNodata :boolean;
  isNoAllData : boolean;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private employeeService: EmployeeService,
    private storage: StorageService,
    private route: ActivatedRoute,
    private toastr: ToastServiceService,
    private spinner: NgxSpinnerService,
  ) { 
    this.route.queryParams.subscribe(params => {
      this.employeeId = params['id'];
    });
  }

  
  ngOnInit(): void {
    this.sessionUser = this.storage.getItem("user");
    this.viewOrEditModeEnable = true;
    this._prepare();
      this.nodata = `${NODATA}`,
      this.nodata1 = `${NODATA1}`

  }

  _prepare() {
    this.getEmployeeDetails();
    this.getTurnOverAnalyticsInEmpView();
    this.getLastVSCurrentEva();
  }

  progressNoteDialog() {
    this.dialog.open(ProgressNotesComponent, {
      // width: '250px',
      panelClass: 'custom-container'
    });
  }

  deleteEmployee() {
    this.dialog.open(DeleteEmployeeComponent, {
      data: this.employeeId,
      panelClass: 'my-dialog'
    });
  }


  getEmployeeDetails() {
    this.spinner.show();
    this.employeeService.getEmployeeDetails(this.sessionUser,this.employeeId).subscribe((employeeResponse: any)=> {
      this.employeeModel = employeeResponse.data.employee_details
      this.spinner.hide();
    },
    error => {
      this.spinner.hide();
      this.toastr.errorMessage(error);
    })
  }

  getTurnOverAnalyticsInEmpView() {
    this.spinner.show();
    this.employeeService.getViewAnalytics(this.sessionUser,this.employeeId).subscribe((data: any)=> {
      this.drivers = data.data.tunover_details.drivers;
      this.turnOverProbability =data.data.tunover_details.probability;
      this.relentionPeriod = data.data.tunover_details.period;
      this.measures=  data.data.tunover_details.measures;
      this.analyticsPeriod = data.data.period;
      this.is_drivers_exists = data.data.tunover_details.is_drivers_exists;
      this.spinner.hide();
    },
    error => {
      this.spinner.hide();
      this.toastr.errorMessage(error);
    })
  }

  getLastVSCurrentEva() {
    this.spinner.show();
    this.employeeService.getLastVsCurrentEva(this.sessionUser,this.employeeId).subscribe((data: any)=> {

      //header
      this.prev_period = data.data.prev_period;
      this.current_period =data.data.current_period;

      // 01 box data set
      this.rate_turnOver_prob = data.data.evaluation_details.prob_rate;
      this.currentRate =data.data.evaluation_details.current_prob;
      this.previousRate = data.data.evaluation_details.previous_prob;
      let increaseArrow =data.data.evaluation_details.is_prob_increase;
      //this.isNodata=data.data.evaluation_details.is_prev_factors_exists && data.data.evaluation_details.current_prob;
      if(this.currentRate==="No Data" && this.previousRate==="No Data"){
        console.log("AAAAA")
        this.isNodata=  true;
      }else if( this.previousRate==="No Data"){
        console.log("cccc")
        this.isNoAllData=  true;
        this.isNodata=  false;
      }else{
        console.log("fff")
        this.isNodata= true;
        this.isNoAllData=  true;
      }
      
      
      if(increaseArrow != null) {
        if(increaseArrow) {
          this.arrow_icon_turnOver_prob = this.arrow_upward;
        } else if(!increaseArrow) {
          this.arrow_icon_turnOver_prob = this.arrow_downward;
        }
  
      }
  
      // 02 box data set
      this.year_relention_perod = data.data.evaluation_details.period_rate;
      this.currentYear =data.data.evaluation_details.current_period;
      this.previousYear = data.data.evaluation_details.prev_period;
      let decreaseArrow =data.data.evaluation_details.is_period_increase;
      this.is_prev_factors_exists = data.data.evaluation_details.is_prev_factors_exists;
      if(decreaseArrow != null) {
      if(decreaseArrow) {
        this.arrow_icon_relention_perod = this.arrow_upward;
      } else if(!decreaseArrow) {
        this.arrow_icon_relention_perod = this.arrow_downward;
      }
    }
      // 03 box data set
      this.driverImpact = data.data.evaluation_details.prev_pred_factors;
    },
    error => {
      this.spinner.hide();
      this.toastr.errorMessage(error);
    })
    this.spinner.hide();
  }

  editProfile() {
    // this.dialog.open(EditEmployeeProfileComponent)
    // this.router.navigate('edit-employee-profile')
    // this.viewOrEditModeEnable = !this.viewOrEditModeEnable
  }

  viewProfile() {
    // this.viewOrEditBtnEnable = !this.viewOrEditModeEnable
  }
}
