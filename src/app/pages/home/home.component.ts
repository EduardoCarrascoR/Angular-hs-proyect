import { Component, OnChanges, OnInit } from '@angular/core';
import { report } from 'process';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import * as canvasJs from "../../../assets/canvasjs.min";
import { Chart } from 'chart.js'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  $reports: Observable<any>;
  chart;
  datos: [{
    y: number,
    label: string
  }]

  constructor(
    private api: ApiService
  ) { }

  canvas() {
    this.$reports = this.api.getReports();
    this.$reports.subscribe(data => {
      const qty = data.types.map(res => res.y);
      const label = data.types.map(res => res.label);
      console.log(qty);
      console.log(label);

      this.chart = new Chart('canvas', {
        type: 'pie',
        data: {
          labels: label,
          datasets: [{
            data: qty,
            backgroundColor: [
              'red', 'blue', 'yellow', 'green', 'orange',
            ],
          }]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Reporte'
          }
        }
      })
    })
  }

  ngOnInit(): void {
    this.canvas()
  }

  actualizar() {
    this.chart.destroy();
    this.canvas()
  }
}

function simulateClick() {
  var event = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });
  var cb = document.getElementById('btn1');
  var canceled = !cb.dispatchEvent(event);
}

setInterval(simulateClick, 3600000);