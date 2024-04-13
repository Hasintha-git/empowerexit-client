import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { CommonResponse } from 'src/app/models/response/CommonResponse';
import { StorageService } from 'src/app/models/StorageService';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { SessionService } from 'src/app/services/session/session-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastServiceService } from 'src/app/services/toast-service.service';

Chart.register(...registerables);
export interface Department {
  id: string;
  name: string;
  percentage: string;
  predicted_count: string;
  total_count: string;
}

export interface Department {
  deparment: string;
  predictedTurnover: number;
  turnOverRate: string;
}

export interface Performance {
  id: string;
  name: string;
  rate: string;
}

export interface TopTurnover {
  drivers: string;
  employeePercentage: string;
}

const ELEMENT_DATA_TOPTURNOVER: TopTurnover[] = [
  { drivers: 'Monthly Salary', employeePercentage: '75%' },
  { drivers: 'Job Dissatisfaction', employeePercentage: '60%' },
  { drivers: 'Workload', employeePercentage: '55%' },
  { drivers: 'Work Life Balance', employeePercentage: '50%' },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumnsEmployee: string[] = ['deparment', 'predictedTurnover', 'actualTurnOver', 'turnOverRate'];
  displayedColumnsDepartment: string[] = ['deparment', 'predictedTurnover', 'turnOverRate'];
  // displayedColumnsPerformance: string[] = ['employeeId', 'name', 'performanceGrade', 'probabilityRate'];
  displayedColumnsPerformance: string[] = ['employeeId', 'name', 'probabilityRate'];
  displayedColumnsTopTurnOver: string[] = ['drivers', 'employeePercentage'];
  public departmentWiseEmpTurnoverList: Department[];
  public performanceWiseEmpTurnoverList: Performance[];
  dataSourceTopTurnOver = ELEMENT_DATA_TOPTURNOVER;

  TurnOvermonth: any;
  TurnOveryear: any;

  titileDate: any;
  nextEvaDate: any;

  driversMonth: any;
  driversYear: any;

  //card 1 >>>
  totalEmployeeWithOutEmployeeCount: string;
  totalEmployeeWithOutEmployeeDescription: string;
  total_employee_count: string;

  //card 2 >>>
  departmentWithHighestTurnOverCategory: string;
  departmentWithHighestTurnOverDescription: string;

  //card 3 >>>
  gradeAPerfomanceCount: string;
  gradeAPerfomanceDescription: string;

  //table 01
  departmentMonth: string;
  departmentYear: string;
  turnover_true_emp_count: string;
  total_emp_turnover_true_count_percentage: string;

  // table 02
  performersMonth: string;
  performersYear: string;

  sessionUser: any;


  chart: Chart;
  
  //table 03
  hotel_performance_asses: number;
  last_promotion: number;
  years_work_current_hotel: number;
  turnOverDriversTitleList: string[];
  turnOverDriversValuesList: number[];

  //table 04
  table4Data: any;
  pastPredictionDateList: string[];
  pastPredictionValuesList: number[];

  constructor(private toastr: ToastServiceService,private spinner: NgxSpinnerService,private storage: StorageService, private dashboardService: DashboardService) {
    this.titileDate = '25th November 2022';
    this.nextEvaDate = '9th December 2022';

    this.sessionUser = this.storage.getItem("user");
  }

  ngOnInit(): void {
    this.spinner.show();
    // this.refreshToken()
    this.employeesStatisticsCurrentMonth();
    this.departmentWiseTurnover()
    this.performanceWiseTurnover();
    this.topTurnOverDrivers();
    this.predictedTurnoverRatesEva()
    this.linerChartBrowser();

  }


  // api calling 
  refreshToken() {
    this.dashboardService.refreshAccessToken(this.sessionUser).subscribe((data: any) => {
      const newAccessToken = data.access_token;
      this.sessionUser.access_token = newAccessToken;
      this.storage.setItem('user', this.sessionUser);
      this.employeesStatisticsCurrentMonth();
      this.departmentWiseTurnover()
      this.performanceWiseTurnover();
      this.topTurnOverDrivers();
      this.predictedTurnoverRatesEva()
    })
  }

  departmentWiseTurnover() {
    this.dashboardService.departmentWiseTurnover(this.sessionUser).subscribe((data: any) => {
      this.departmentMonth = data.data.month_name
      this.departmentYear = data.data.year
      this.turnover_true_emp_count = data.data.turnover_true_emp_count;
      this.total_emp_turnover_true_count_percentage = data.data.total_emp_turnover_true_count_percentage

      this.departmentWiseEmpTurnoverList = data.data.total_emp_turnover_true_dept_stats
    })
  }

  performanceWiseTurnover() {
    this.dashboardService.performanceWiseTurnover(this.sessionUser).subscribe((data: any) => {
      this.performersMonth = data.data.month_name
      this.performersYear = data.data.year
      this.performanceWiseEmpTurnoverList = data.data.high_performance_emp_stats
    },
    error => {
      this.spinner.hide();
      this.toastr.errorMessage(error);
    })
  }

  employeesStatisticsCurrentMonth() {
    this.dashboardService.employeesStatisticsCurrentMonth(this.sessionUser).subscribe((data: CommonResponse) => {
      this.totalEmployeeWithOutEmployeeCount = data.data.turnover_true_emp_count
      this.total_employee_count = data.data.total_employee_count
      this.departmentWithHighestTurnOverCategory = data.data.highest_turnover_rate_department
      this.gradeAPerfomanceCount = data.data.turnover_true_A_rated_emp_count;
      this.TurnOveryear = data.data.year;
      this.TurnOvermonth = data.data.month_name;
      this.spinner.hide();
    },
    error => {
      this.spinner.hide();
      this.toastr.errorMessage(error);
    })
  }

  topTurnOverDrivers() {
    this.dashboardService.topTurnOverDrivers(this.sessionUser).subscribe((data: any) => {
      this.driversMonth=data.data.month_name;
      this.driversYear=data.data.year;
      this.turnOverDriversTitleList = new Array(data.data.top_drivers.length).fill('');
      this.turnOverDriversValuesList = new Array(data.data.top_drivers.length).fill(0);

      data.data.top_drivers.forEach((driver: { name: string, rate: number }, index: number) => {
        this.turnOverDriversTitleList[index] = driver.name;
        this.turnOverDriversValuesList[index] = driver.rate;
      });
      this.barChartBrowser();
    },
    error => {
      this.spinner.hide();
      this.toastr.errorMessage(error);
    })
  }

  predictedTurnoverRatesEva() {
    this.dashboardService.predictedTurnoverRatesEva(this.sessionUser).subscribe((data: any) => {
      this.pastPredictionDateList = new Array(data.data.past_predictions.length).fill('');
      this.pastPredictionValuesList = new Array(data.data.past_predictions.length).fill(0);

      data.data.past_predictions.forEach((turnover: { date: string, rate: number }, index: number) => {
        this.pastPredictionDateList[index] = turnover.date;
        this.pastPredictionValuesList[index] = turnover.rate;
      });
      this.linerChartBrowser();
    },
    error => {
      this.spinner.hide();
      this.toastr.errorMessage(error);
    })
  }

  barChartBrowser(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    setTimeout(() => {
    this.chart= new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.turnOverDriversTitleList,
        // labels: ['','','','',''],
        datasets: [{
          label: 'Affected Employee Percentage',
          data: this.turnOverDriversValuesList,
          backgroundColor: [
            '#000080',
            '#000080',
            '#000080',
            '#000080',
          ],
          borderWidth: 0
        }]
      },
      options: {
        plugins: {
          title: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            display: false
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }, 100);
  this.spinner.hide();
  }



  //Predicted Turnover Rates over Evaluations

  linerChartBrowser(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    setTimeout(() => {
    this.chart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: this.pastPredictionDateList,
        datasets: [{
          label: 'Predicted Turnover Rate',
          data: this.pastPredictionValuesList,
          backgroundColor: [
            '#000080',
            '#000080',
            '#000080',
            '#000080',
          ],
          borderWidth: 0.8,
          borderColor: '#000080',
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
        maintainAspectRatio: false
      },

    });
  },100);
  this.spinner.hide();
  }


}
