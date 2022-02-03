import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
  };
  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
  };
  globalData: GlobalDataSummary[] = [];
  constructor(private dataService: DataServiceService) {}

  initChart() {
    let datatable: string[][] = [];
    datatable.push(['Country', 'Cases']);
    this.globalData.forEach((cs) => {
      if ((cs.confirmed as any) > 500000) {
        datatable.push([cs.country as any, cs.confirmed as any]);
      }
    });

    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {
        height: 500,
      },
    };
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {
        height: 500,
      },
    };
  }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next: (result) => {
        console.log(result);
        this.globalData = result;
        result.forEach((cs) => {
          if (!Number.isNaN(cs.confirmed)) {
            this.totalActive += cs.active || 1;
            this.totalConfirmed += cs.confirmed || 1;
            this.totalDeaths += cs.deaths || 1;
            this.totalRecovered += cs.recovered || 1;
          }
        });

        this.initChart();
      },
    });
  }
}
