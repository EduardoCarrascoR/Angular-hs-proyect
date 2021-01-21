import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client.interface';
import { ApiService } from 'src/app/services/api.service';
import { MaterializeAction } from 'angular2-materialize';
import * as dayjs from 'dayjs'

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients$: Observable<any>;
  clientSelected: Client
  today: string = dayjs().format('YYYY-MM-DD')
  $reports: Observable<any>
  dateSelected: string = this.today
  modalActions = new EventEmitter<string | MaterializeAction>();

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.clients$ = this.api.getClients()
  }

  openModal(client) {
    this.getReportsByClientIdAndDate(client.clientId)

    this.clientSelected = client;
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
    this.dateSelected = this.today
  }

  getReportsByClientIdAndDate(clientId: number) {
    this.$reports = this.api.getReportsByClientIdAndDate(clientId, this.dateSelected)
  }

}
