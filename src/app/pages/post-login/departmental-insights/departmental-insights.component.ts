import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService } from 'src/app/models/StorageService';
import { DepartmentalInsightsService } from 'src/app/services/departmental/departmental-insights.service';
import { ToastServiceService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-departmental-insights',
  templateUrl: './departmental-insights.component.html',
  styleUrls: ['./departmental-insights.component.scss']
})
export class DepartmentalInsightsComponent implements OnInit {


  chartLabelList: string[];
  chartDataList: any[];
  chart_data: any[] = [];

  responseObject: any;

  sessionUser: any;

  // 1st section
  latest_eva_date: string;
  highest_gradeA_dept: string;
  highest_dept: string;
  lowest_dept: string;

  chart: Chart;

  constructor(private toastr: ToastServiceService, private spinner: NgxSpinnerService, private storage: StorageService, private departmentalService: DepartmentalInsightsService) {
    this.sessionUser = this.storage.getItem("user");
  }

  ngOnInit(): void {
    this.spinner.show();
    this.responseObject = [];
    // this.setValues();
    this.getData();
  }


  getData() {
    this.departmentalService.getDepartmentalInsights(this.sessionUser).subscribe((data: any) => {
      this.responseObject = data;
      this.setValues();

    },
      error => {
        this.spinner.hide();
        this.toastr.errorMessage(error);
      })
  }

  setValues() {
    this.latest_eva_date = this.responseObject.data.department_insight_stats.date;
    this.highest_gradeA_dept = this.responseObject.data.department_insight_stats.highest_gradeA_dept;
    this.highest_dept = this.responseObject.data.department_insight_stats.highest_dept;
    this.lowest_dept = this.responseObject.data.department_insight_stats.lowest_dept;

    for (let index = 0; index < this.responseObject.data.department_insights.length; index++) {
      const dataObject = this.responseObject.data.department_insights[index].chart_data[0];
      this.chart_data[index] = [];
      const gradeNames = Object.keys(dataObject);

      // Get the list of values as an array
      const gradeValues = Object.values(dataObject);
      this.chart_data[index].push(this.responseObject.data.department_insights[index].department_name);
      this.chart_data[index].push(this.responseObject.data.department_insights[index].total_emp);
      this.chart_data[index].push(this.responseObject.data.department_insights[index].avg_turnover_rate);
      this.chart_data[index].push(this.responseObject.data.department_insights[index].predicted_turnovers);
      this.chart_data[index].push(gradeNames);
      this.chart_data[index].push(gradeValues);

      this.chartLabelList = gradeNames;
      this.chartDataList = gradeValues;

    }

    this.barChartBrowser();

  }

  barChartBrowser(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    setTimeout(() => {
      for (let index = 0; index < this.chart_data.length; index++) {
        const a = "chart" + index;
        this.chart = new Chart(a, {
          type: 'pie',
          data: {
            labels: this.chart_data[index][4],
            // labels: ['','','','',''],
            datasets: [{
              data: this.chart_data[index][5],
              backgroundColor: [
                '#000080',
                '#000080',
                '#000080',
                '#000080',
              ],
            }]
          },
          options: {
            plugins: {
              legend: {
                display: false // Hide the legend
              },

            },
            responsive: true,
            maintainAspectRatio: false
          },

        });
      }

    }, 100);
    this.spinner.hide();
  }
}
