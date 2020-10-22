import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toast } from 'angular2-materialize';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { MaterializeAction } from "angular2-materialize";
import { User } from 'src/app/models/user.interface';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.interface';

@Component({
  selector: 'app-create-shift',
  templateUrl: './create-shift.component.html',
  styleUrls: ['./create-shift.component.css']
})
export class CreateShiftComponent implements OnInit {
    
  selectedDate
  datePickerConfig = {
    firstDayOfWeek: 'mo',
    allowMultiSelect : true,
    format: "YYYY-MM-DD",
    returnedValueType: 'string'
  }
  guardsSelected: string[] = []
  guardsIds: number[] = []
  guardsNames: string[] = []
  dateSelected: string[] = []
  chipsActions = new EventEmitter<string | MaterializeAction>();
  autocompleteInit = {
    autocompleteOptions: {
      data: {
        '': null
      },
      limit: Infinity,
      minLength: 1
    }
  };

  createShiftForm: FormGroup;
  // types: Observable<any>
  public typeWrong = null;
  guards: User[] = []
  clients: Client[] = []

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.createShiftForm = this.createCreateShiftForm();
    this.api.getGuards().subscribe((guards: any) => {
      this.guards = guards.guards;
      this.guards.forEach(guard => {
        this.guardsNames.push(guard.firstname + ' ' + guard.lastname)
        this.autocompleteInit.autocompleteOptions.data[guard.firstname + ' ' + guard.lastname] = null
      })
    });
    this.api.getClients().subscribe((clients: any) => {
      this.clients = clients.clients;
      console.log(this.clients)
  
    });
    
  }

  private createCreateShiftForm() {
    return this.formBuilder.group({
      type: ['', Validators.required],
      start: ['', Validators.required],
      finish: ['', Validators.required],
      dates: ['', Validators.required],
      shiftPlace: ['', Validators.required],
      client: ['', Validators.required],
      guardsIds: ['', Validators.required],
    })
  }

  getDate(date) {
    // console.log('event:', date.date)
  }

  addShift() {
    if (this.createShiftForm.value.type === 'diurno') {
      this.createShiftForm.value.type = 'Day'
    } else if (this.createShiftForm.value.type === 'vespertino') {
      this.createShiftForm.value.type = 'Night'
    } else {
      toast('Turno debe ser diurno o vespertino', 3000)
      throw Error('Error en tipo de turno')
    }
    this.guardsSelected = this.guardsSelected.filter((value, index) => this.guardsSelected.indexOf(value) === index)
    new Promise(async (resolve, reject) => {
      for await (const guardChip of this.guardsSelected) {
        if(this.guardsNames.includes(guardChip)){
          for await (const apiGuard of this.guards) {
            if(guardChip == (apiGuard.firstname + ' ' + apiGuard.lastname)) {
              this.guardsIds.push(apiGuard.id)
              break
            }
          }
        } else {
          toast(`El guardia ${guardChip} no existe`, 3000)
          reject(`guardias que no existen seleccionados`)
        }
      }
      resolve()
    })
    .then(async () => {
      this.createShiftForm.value.dates = await this.createShiftForm.value.dates.map(date => date.format('YYYY-MM-DD'))
      this.createShiftForm.value.guardsIds = await this.guardsIds;
      await console.log(this.createShiftForm.value);
      let type = this.createShiftForm.value.type;
      let start = this.createShiftForm.value.start;
      let finish = this.createShiftForm.value.start;
      let dates = this.createShiftForm.value.dates;
      let shiftPlace = this.createShiftForm.value.shiftPlace;
      let guardsIds = this.createShiftForm.value.guardsIds;
      await this.api.createShift(type, start, finish, dates, shiftPlace, guardsIds).toPromise()
      .then((res: any) => {
        console.log(res);
        toast('Turno creado correctamente', 3000)
        /* this.router.navigate(['/dashboard/guards']) */
      })
      .catch(err => {
        toast('Error al crear turno', 3000)
      })
    })
    .catch(err => {
      console.log({err});
    })
  }

  // confirm new password validator
  checkType() {
    if (this.createShiftForm.value.type == 'diurno' || this.createShiftForm.value.type == 'vespertino') {
      this.type.setErrors({ mismatch: false });
      this.typeWrong = false;
    } else {
      this.type.setErrors({ mismatch: true });
      this.typeWrong = true;
    }
  }

  // getting the form control elements
  get type(): AbstractControl {
    return this.createShiftForm.controls['type'];
  }


  add(chip) {
    // aqui igualar el chip.tag a la variable q guarda el dato del formulario
    this.guardsSelected.push(chip.tag)
  }
  async saveCode(e) {
    let name = await e.target.value;
    let list = await this.clients.map(x => {if(x.name === name) return x.id})[0];
    await console.log(list);
    }
}
