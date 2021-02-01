import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from "moment";
import { ApiService } from 'src/app/services/api.service';
import { Shift, ShiftPages } from '../../models/shift.interface';
import { MaterializeAction, toast } from 'angular2-materialize'
import { User } from 'src/app/models/user.interface';
import { News } from 'src/app/models/news.interface';
import { Visit } from 'src/app/models/visit.interface';
import { Client } from 'src/app/models/client.interface';
import { GuardLocation } from 'src/app/models/guardLocation.interface';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.css']
})
export class ShiftsComponent implements OnInit {

  $clients: Observable<Client[]>;
  $shifts: Observable<any>;
  shiftsForm: FormGroup;
  filtersForm: FormGroup;
  guardsShiftSelected: User[];
  gpsGuardsShiftSelected: GuardLocation[];
  newsShiftSelected: News[];
  visitsShiftSelected: Visit[];
  minDate:string;
  maxDate:string;
  paramsModal = [{
    dismissible: false,
    startingTop: '50%'
  }]
  public pages = [];
  public actualPage: number;
  public nextsPage: number;
  public limit: number;
  public pagelimit: number;
  modalActions = new EventEmitter<string|MaterializeAction>();
  modalNewsActions = new EventEmitter<string|MaterializeAction>();
  modalVisitsActions = new EventEmitter<string|MaterializeAction>();
  modalfilterActions = new EventEmitter<string|MaterializeAction>();
  
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.shiftsForm = this.updateShiftsForm()
    this.filtersForm = this.shiftFiltersForm()
    this.minDate = moment().subtract("1","year").format("YYYY-MM-DD")
    this.maxDate = moment().format("YYYY-MM-DD")
    this.chargePage(1,this.filtersForm.value.limit)
  }

  private updateShiftsForm() {
    return this.formBuilder.group({
      page: ['', Validators.required]
    })
  }
  
  private shiftFiltersForm() {
    return this.formBuilder.group({
      limit: [10, Validators.required],
      client: ['', Validators.required],
      date: ['', Validators.required],
    })
  }

  openModal(guards, GuardLocation?) {
    this.guardsShiftSelected = guards
    this.gpsGuardsShiftSelected = GuardLocation
    if(this.guardsShiftSelected){
      this.modalActions.emit({action:"modal",params:['open']});
    } else {
      alert("error al abrir reportes")
    }
    
  }
  openModalNews(news) {
    this.newsShiftSelected = news
    if(this.newsShiftSelected){
      this.modalNewsActions.emit({action:"modal",params:['open']});
    } else {
      alert("error al abrir novedades")
    }
  }

  openModalVisits(visits) {
    this.visitsShiftSelected = visits
    if(this.visitsShiftSelected){
      this.modalVisitsActions.emit({action:"modal",params:['open']});
    } else {
      alert("error al abrir visitas")
    }
  }

  openModalfilter() {
    this.$clients = this.api.getClients()
    this.modalfilterActions.emit({action:"modal",params:['open']});
  }

  closeModal() {
    this.guardsShiftSelected = null;

    this.modalActions.emit({action:"modal",params:['close']});
  }

  closeModalNews() {
    this.newsShiftSelected = null;
    this.modalNewsActions.emit({action:"modal",params:['close']});
  }

  closeModalVisits() {
    this.visitsShiftSelected = null;
    this.modalVisitsActions.emit({action:"modal",params:['close']});
  }

  closeModalFilter() {
    this.visitsShiftSelected = null;
    this.modalfilterActions.emit({action:"modal",params:['close']});
  }

  sendReport(shiftId,client) {
    this.api.sendReport(shiftId,client).toPromise().then(() => {
      toast("Enviando",1000)

    }).catch(() => {
      toast("Error al enviar")
    })
  }

  addFilter() {
    this.chargePage(1, this.filtersForm.value.limit)
    this.calcPages()
  }
  
  chargePage(page: number, limit: number) {
    this.actualPage = page;
    
    this.$shifts = this.api.getShifts(page, limit, this.filtersForm.value.date, this.filtersForm.value.client)
    this.$shifts.subscribe((res: any) => {
      this.pagelimit = res.pages
      this.calcPages()
    });
  }

  nextPage() {
    this.calcPages();
    (this.actualPage === this.pagelimit) ? null: this.chargePage(this.actualPage+1,this.filtersForm.value.limit)
  }
  prevPage() {
    this.calcPages();
    (this.actualPage === 1) ? null: this.chargePage(this.actualPage-1,this.filtersForm.value.limit)
  }
  goToPage(page) {
    this.calcPages()
    this.chargePage(page,this.filtersForm.value.limit)
  }

  calcPages() {
    if (this.actualPage===1) {
      this.pages = []
      this.pages.push(1);
      (this.pagelimit >= 2) ?this.pages.push(2): null;
      (this.pagelimit >= 3) ?this.pages.push(3): null;
      (this.pagelimit >= 4) ?this.pages.push(4): null;
      (this.pagelimit >= 5) ?this.pages.push(5): null;
    } else if(this.actualPage===this.pagelimit) {
      this.pages = [];
      (this.pagelimit >= this.actualPage-4 && this.actualPage-4 > 0) ?this.pages.push(this.actualPage-4): null;
      (this.pagelimit >= this.actualPage-3 && this.actualPage-3 > 0) ?this.pages.push(this.actualPage-3): null;
      (this.pagelimit >= this.actualPage-2 && this.actualPage-2 > 0) ?this.pages.push(this.actualPage-2): null;
      (this.pagelimit >= this.actualPage-1 && this.actualPage-1 > 0) ?this.pages.push(this.actualPage-1): null;
      this.pages.push(this.actualPage)
    } else if(this.actualPage == 2){
      this.pages = [];
      (this.pagelimit >= this.actualPage-1) ?this.pages.push(this.actualPage-1): null;
      this.pages.push(this.actualPage);
      (this.pagelimit >= this.actualPage+1) ?this.pages.push(this.actualPage+1): null;
      (this.pagelimit >= this.actualPage+2) ?this.pages.push(this.actualPage+2): null;
      (this.pagelimit >= this.actualPage+3) ?this.pages.push(this.actualPage+3): null;
    } else if(this.actualPage == this.pagelimit-1){
    } else if(this.actualPage == 3){
      this.pages = [];
      (this.pagelimit >= this.actualPage-2) ?this.pages.push(this.actualPage-2): null;
      (this.pagelimit >= this.actualPage-1) ?this.pages.push(this.actualPage-1): null;
      this.pages.push(this.actualPage);
      (this.pagelimit >= this.actualPage+1) ?this.pages.push(this.actualPage+1): null;
      (this.pagelimit >= this.actualPage+2) ?this.pages.push(this.actualPage+2): null;
    } else if(this.actualPage == this.pagelimit-1){
      this.pages = [];
      (this.pagelimit >= this.actualPage-3) ?this.pages.push(this.actualPage-3): null;
      (this.pagelimit >= this.actualPage-2) ?this.pages.push(this.actualPage-2): null;
      (this.pagelimit >= this.actualPage-1) ?this.pages.push(this.actualPage-1): null;
      this.pages.push(this.actualPage);
      (this.pagelimit >= this.actualPage+1) ?this.pages.push(this.actualPage+1): null;
    } else {
      this.pages = [];
      (this.pagelimit >= this.actualPage-2) ?this.pages.push(this.actualPage-2): null;
      (this.pagelimit >= this.actualPage-1) ?this.pages.push(this.actualPage-1): null;
      this.pages.push(this.actualPage);
      (this.pagelimit >= this.actualPage+1) ?this.pages.push(this.actualPage+1): null;
      (this.pagelimit >= this.actualPage+2) ?this.pages.push(this.actualPage+2): null;

    }
  }
}
