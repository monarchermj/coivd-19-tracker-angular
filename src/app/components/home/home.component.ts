import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
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

  globalData: GlobalDataSummary[] = [];
  datatable: any[] = [];
  chart = {
    PieChart: ChartType.PieChart,
    ColumnChart: ChartType.ColumnChart,
    height: 500,
    width: 800,
    options: {
      animation: 1000,
      easing: 'out', 
      is3D: true,
    },
   
  };

  constructor(private dataService: DataServiceService) {}

  initChart(caseType: string) {
    // this.datatable.push(['Country', 'Cases']);
    this.datatable = [];
    let value: number;
    this.globalData.forEach((cs) => {
      if (caseType == 'c') {
        if ((cs.confirmed as any) > 1000000) {
          value = cs.confirmed as any;
        }
      }
      if (caseType == 'r') {
        if ((cs.recovered as any) > 500000) {
          value = cs.recovered as any;
        }
      }
      if (caseType == 'd') {
        if ((cs.deaths as any) > 10000) {
          value = cs.deaths as any;
        }
      }
      if (caseType == 'a') {
        if ((cs.active as any) > 10000) {
          value = cs.active as any;
        }
      }
      this.datatable.push([cs.country as string, value]);
    });
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

        this.initChart('c');
      },
    });
  }
  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value);
  }
}
