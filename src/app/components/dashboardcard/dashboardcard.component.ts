import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboardcard',
  templateUrl: './dashboardcard.component.html',
  styleUrls: ['./dashboardcard.component.css'],
})
export class DashboardcardComponent implements OnInit {
  @Input('totalConfirmed')
  totalConfirmed: any;
  @Input('totalRecovered')
  totalRecovered: any;
  @Input('totalDeaths')
  totalDeaths: any;
  @Input('totalActive')
  totalActive: any;

  constructor() {}

  ngOnInit(): void {}
}
