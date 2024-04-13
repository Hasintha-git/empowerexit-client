import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimpleBase } from 'src/app/models/SimpleBase';
import { StorageService } from 'src/app/models/StorageService';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { saveAs } from 'file-saver';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastServiceService } from 'src/app/services/toast-service.service';

export interface Vegetable {
  name: string;
}
export interface Analytics {
  id: number;
  emp_id: string;
  name: string;
  department: string;
  performance: string;
  period: string;
  probability: string;
}


@Component({
  selector: 'app-employee-analytics',
  templateUrl: './employee-analytics.component.html',
  styleUrls: ['./employee-analytics.component.scss']
})
export class EmployeeAnalyticsComponent implements OnInit {
  displayedColumns: string[] = ['employeeId', 'employeeName', 'department', 'performance', 'turnOverProbability', 'reteintionPeriod', 'action'];
  dataSource: Analytics[]=[];
  public searchList: FormGroup;

  cusStatus = new FormControl('');
  list1 = new FormControl('');
  list2 = new FormControl('');
  list3 = new FormControl('');
  list4 = new FormControl('');
  list1Lenght: any;
  list2Lenght: any;
  list3Lenght: any;
  list4Lenght: any;

  emp_idController = new FormControl();
  statusList1 = new FormControl();
  statusList2 = new FormControl();
  statusList3 = new FormControl();
  statusList4 = new FormControl();
  statusList5 = new FormControl();

  public List1: SimpleBase[];

  emp_id: any;
  detailsList1: Array<number> = null;
  detailsList1_2: Array<number> = [];

  public List2: SimpleBase[];
  detailsList2: Array<number> = null;
  detailsList2_2: Array<number> = [];

  public List3: SimpleBase[];
  detailsList3: Array<number> = null;
  detailsList3_2: Array<number> = [];

  public List4: SimpleBase[];
  detailsList4: Array<number> = null;
  detailsList4_2: Array<number> = [];

  sessionUser: any;

  constructor(private toastr: ToastServiceService,private spinner: NgxSpinnerService,private _snackBar: MatSnackBar,private formBuilder: FormBuilder, private employeeService: EmployeeService, private storage: StorageService) {
    this.list1Lenght = 0;
    this.list2Lenght = 0;
    this.list3Lenght = 0;
    this.list4Lenght = 0;
    this.sessionUser = this.storage.getItem("user");
    this.emp_id = null
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.analytics_list();
    this.departments_list();
    this.performance_categories_list();
    this.retention_pereiods_list();
    this.turnover_rates_list();
  }

  emp_id_search() {
    (this.emp_id.length);
    if(this.emp_id.length == 0) {
      this.emp_id=null;
    }
    this.employeeAnalyticsSearch();

  }

  reportDownload() {
    this.spinner.show();
    this.employeeAnalyticsSearchDownload();

  }

  employeeAnalyticsSearch() {
    this.spinner.show();
    const obj = {
      emp_id: this.emp_id,
      department_value: this.detailsList1,
      performance_value: this.detailsList2,
      retention_value: this.detailsList3,
      turnover_value: this.detailsList4
    };
    //     const obj = {
    //   emp_id: this.emp_id,
    //   department_value: "null",
    //   performance_value: "null",
    //   retention_value: 2,
    //   turnover_value: "null"
    // };

    this.employeeService.employeeAnalyticsSearch(obj, this.sessionUser).subscribe((data: any) => {

      this.dataSource = data.data.results
      this.spinner.hide();
    },
    error => {
      this.spinner.hide();
      this.toastr.errorMessage(error);
    })
  }

  employeeAnalyticsSearchDownload() {
    const obj = {
      values:this.dataSource
    };
    this.toastr.infoMessage("Report Preparing...");
    this.employeeService.employeeAnalyticsSearchDownload(obj, this.sessionUser).subscribe((data: any) => {
    
      // this.dataSource = data.data.results
      const file = new Blob([data], { type: 'application/pdf' });
      saveAs(file, 'report.pdf');
      this.toastr.successMessage("Report downloaded");
      this.spinner.hide();
    },
    error => {
      this.spinner.hide();
      this.toastr.errorMessage(error);
    })
  }
  analytics_list() {
    this.spinner.show();
    this.employeeService.employeeAnalytics(this.sessionUser).subscribe((data: any) => {
      this.dataSource = data.data.employee_analytics
      this.spinner.hide();
    },
    error => {
      this.spinner.hide();
      this.toastr.errorMessage(error);
    })
  }

  departments_list() {
    this.employeeService.departments(this.sessionUser).subscribe((data: any) => {
      this.List1 = data.data.department_details;
    },
    error => {
      this.spinner.hide();
      this.toastr.errorMessage(error);
    })
  }

  performance_categories_list() {
    this.employeeService.performance_categories(this.sessionUser).subscribe((data: any) => {
      this.List2 = data.data.performance_categories;
    })
  }

  retention_pereiods_list() {
    this.employeeService.retention_pereiods(this.sessionUser).subscribe((data: any) => {
      this.List3 = data.data.retebtion_pereiods;
    },
    error => {
      this.spinner.hide();
      this.toastr.errorMessage(error);
    })
  }

  turnover_rates_list() {
    this.employeeService.turnover_rates(this.sessionUser).subscribe((data: any) => {
      this.List4 = data.data.performance_categories;
    },
    error => {
      this.spinner.hide();
      this.toastr.errorMessage(error);
    })
  }

  // deleteEmployee(id: any) {
  //   this.employeeService.deleteEmployee(this.sessionUser, id).subscribe((data: any) => {
  //     this.openSnackBar(data.MESSAGE,data.STATUS)
  //     this.analytics_list()
  //   })
  // }

  remove1(data: any): void {
    const index: number = this.detailsList1.indexOf(data);
    this.detailsList1.splice(index, 1);
    this.detailsList1_2 = this.detailsList1;
    this.detailsList1 =  [];
    for (let index = 0; index < this.detailsList1_2.length; index++) {
      this.detailsList1[index]= this.detailsList1_2[index];

    }
    this.employeeAnalyticsSearch();
  }

  remove2(data: any): void {
    const index: number = this.detailsList2.indexOf(data);
    this.detailsList2.splice(index, 1);
    this.detailsList2_2 = this.detailsList2;
    this.detailsList2 = [];
    for (let index = 0; index < this.detailsList2_2.length; index++) {
      this.detailsList2[index] = this.detailsList2_2[index];

    }
    this.employeeAnalyticsSearch();
  }

  remove3(data: any): void {
    const index: number = this.detailsList3.indexOf(data);
    this.detailsList3.splice(index, 1);
    this.detailsList3_2 = this.detailsList3;
    this.detailsList3 =[];
    for (let index = 0; index < this.detailsList3_2.length; index++) {
      this.detailsList3[index]= this.detailsList3_2[index];

    }
    this.employeeAnalyticsSearch();
  }

  remove4(data: any): void {
    const index: number = this.detailsList4.indexOf(data);
    this.detailsList4.splice(index, 1);
    this.detailsList4_2 = this.detailsList4;
    this.detailsList4 = [];
    for (let index = 0; index < this.detailsList4_2.length; index++) {
      this.detailsList4[index] = this.detailsList4_2[index];

    }
    this.employeeAnalyticsSearch();
  }


  list1Change() {
    this.detailsList1 = null;
    this.list1Lenght = this.statusList1.value?.length;
      if (this.detailsList1 != undefined) {
        for (let index = 0; index < this.list1Lenght; index++) {
          this.detailsList1 = this.statusList1.value[index];
        }
        this.list1Lenght = 0
      } else {
        this.detailsList1 = this.statusList1.value;
      }

    this.employeeAnalyticsSearch();
  }

  list2Change() {
    this.detailsList2 = null
    this.list2Lenght = this.statusList2.value?.length;
      if (this.detailsList2 != undefined) {
        for (let index = 0; index < this.list2Lenght; index++) {
          this.detailsList2 = this.statusList2.value[index];
        }
        this.list2Lenght = 0
      } else {
        this.detailsList2 = this.statusList2.value;
      }
    this.employeeAnalyticsSearch();
  }

  list3Change() {
    this.detailsList3 = null;
    this.list3Lenght = this.statusList3.value?.length;
      if (this.detailsList3 != undefined) {
        for (let index = 0; index < this.list3Lenght; index++) {
          this.detailsList3 = this.statusList3.value[index];
        }
        this.list3Lenght = 0
      } else {
        this.detailsList3 = this.statusList3.value;
      }
    this.employeeAnalyticsSearch();
  }

  list4Change() {
    this.detailsList4 =  null;
    this.list4Lenght = this.statusList4.value?.length;
      if (this.detailsList4 != undefined) {
        for (let index = 0; index < this.list4Lenght; index++) {
          this.detailsList4 = this.statusList4.value[index];
        }
        this.list4Lenght = 0
      } else {
        this.detailsList4 = this.statusList4.value;
      }

    this.employeeAnalyticsSearch();
  }
}
