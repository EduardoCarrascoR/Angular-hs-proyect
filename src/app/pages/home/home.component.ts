import { Component, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { report } from 'process';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.interface';
import { ApiService } from 'src/app/services/api.service';
import * as canvasJs from "../../../assets/canvasjs.min";
import { Chart } from 'chart.js'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  guardsShiftSelected: User[];
  $reports: Observable<any>;
  modalActions = new EventEmitter<string|MaterializeAction>();
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
      const label = data.types.map(res => {
        switch (res.label) {
          case 'Police':
            return 'Policia'
          case 'Firefighter':
            return 'Bombero'
          case 'Ambulance':
            return 'Ambulancia'
          case 'Office1':
            return 'Oficina 1'
          case 'Office2':
            return 'Oficina 2'
        }
      });

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
  
  openModal(shift: User[]) {
    this.guardsShiftSelected = shift
    if(this.guardsShiftSelected){
      this.modalActions.emit({action:"modal",params:['open']});
    }
  }

  closeModal() {
    this.guardsShiftSelected = null;
    this.modalActions.emit({action:"modal",params:['close']});
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