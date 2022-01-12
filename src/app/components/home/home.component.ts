import { Component, OnInit } from '@angular/core';
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
  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next: (result) => {
        console.log(result);

        result.forEach(cs=>{
          this.totalActive+=cs.active||1
          this.totalConfirmed+=cs.confirmed||1
          this.totalDeaths+=cs.deaths||1
          this.totalRecovered+=cs.recovered||1
        })
      },
    });
  }
}
