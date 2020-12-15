import { Component, OnChanges, OnInit } from '@angular/core';
import { report } from 'process';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import * as canvasJs from "../../../assets/canvasjs.min";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  $reports: Observable<any>;
  datos: [{
    y: number,
    label: string
  }]

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.$reports = this.api.getReports()
    this.$reports.subscribe((res:any) => {
      this.datos = res.types
      this.updatePieChar(this.datos)
    })
  }

  updatePieChar(data) {
    let chart = new canvasJs.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Reportes mesuales"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{label}</b>: {y} (#percent%)",
        dataPoints: data
      }]
    });
      
    chart.render();
  }
}
