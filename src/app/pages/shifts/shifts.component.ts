import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Shift, ShiftPages } from '../../models/shift.interface';
import { MaterializeAction, toast } from 'angular2-materialize'
import { User } from 'src/app/models/user.interface';
import { News } from 'src/app/models/news.interface';
import { Visit } from 'src/app/models/visit.interface';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.css']
})
export class ShiftsComponent implements OnInit {

  $shifts: Observable<any>;
  shiftsForm: FormGroup;
  guardsShiftSelected: User[];
  newsShiftSelected: News[];
  visitsShiftSelected: Visit[];
  public pages = [];
  public actualPage: number;
  public lastPage: number;
  public nextPage: number;
  public untilAux: number;
  public limit: number;
  public pagelimit: number;
  modalActions = new EventEmitter<string|MaterializeAction>();
  modalNewsActions = new EventEmitter<string|MaterializeAction>();
  modalVisitsActions = new EventEmitter<string|MaterializeAction>();
  
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.shiftsForm = this.updateShiftsForm()
    this.chargePage(1)
  }

  private updateShiftsForm() {
    return this.formBuilder.group({
      page: ['', Validators.required],
      limit: ['', Validators.required],
    })
  }

  openModal(shiftData) {
    console.log(shiftData)
    this.guardsShiftSelected = shiftData
    if(this.guardsShiftSelected){
      this.modalActions.emit({action:"modal",params:['open']});
    } else {
      console.log("error al abrir modal")
      alert("error al abrir reportes")
    }
    
  }
  openModalNews(news) {
    console.log(news)
    this.newsShiftSelected = news
    if(this.newsShiftSelected){
      this.modalNewsActions.emit({action:"modal",params:['open']});
    } else {
      console.log("error al abrir modal")
      alert("error al abrir novedades")
    }
  }

  openModalVisits(visits) {
    console.log(visits)
    this.visitsShiftSelected = visits
    if(this.visitsShiftSelected){
      this.modalVisitsActions.emit({action:"modal",params:['open']});
    } else {
      console.log("error al abrir modal")
      alert("error al abrir visitas")
    }
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

  download() {
    toast("Descargando",1000)
  }

  chargePage(page: number) {
    this.actualPage = page;
    if(this.shiftsForm.value.limit == "") {
      this.limit = 10
    } else {
      this.limit = Number(this.shiftsForm.value.limit)

    }

    this.$shifts = this.api.getShifts(page, this.limit)
    this.$shifts.subscribe((res: any) => {
      this.pages = [];
      const pagesOnPagination: number = (res.pages < 4) ? res.pages : 4;
      this.lastPage = (page == 1) ? 1 : page - 1;
      this.nextPage = (page != res.pages) ? page + 1 : page;
      if(res.pages < 4) this.pagelimit=res.pages
      if(res.pages >= 4) this.pagelimit=4

      switch (page) {
        case 1:
        case 2:
        case 3:
          for (let i = 0; i < pagesOnPagination; i++) {
            this.pages.push({
              number: i + 1,
              state: ((i + 1) == page) ? 'active' : ''
            });
          }
          break
        default:
          this.untilAux = (page == res.pages) ? res.pages : page + 1;
          for (let i = page - 3; i < this.untilAux; i++) {
            this.pages.push({
              number: i + 1,
              state: ((i + 1) == page) ? 'active' : ''
            });
          }
          if (page == res.pages) {
            this.pages.unshift({
              number: page - 3,
              state: ''
            });
          }
          break
      }
    });
  }
}
