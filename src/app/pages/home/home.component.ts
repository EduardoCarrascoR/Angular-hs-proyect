import { Component, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { report } from 'process';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.interface';
import { ApiService } from 'src/app/services/api.service';
import * as canvasJs from "../../../assets/canvasjs.min";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  guardsShiftSelected: User[];
  $reports: Observable<any>;
  modalActions = new EventEmitter<string|MaterializeAction>();
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
}
