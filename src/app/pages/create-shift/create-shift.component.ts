import { Component, OnInit, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toast } from 'angular2-materialize';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { MaterializeAction } from "angular2-materialize";
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-create-shift',
  templateUrl: './create-shift.component.html',
  styleUrls: ['./create-shift.component.css']
})
export class CreateShiftComponent implements OnInit {


  guardsSelected: string[] = []
  guardsIds: number[] = []
  guardsNames: string[] = []
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

  constructor(
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
  }

  private createCreateShiftForm() {
    return this.formBuilder.group({
      type: ['', Validators.required],
      start: ['', Validators.required],
      finish: ['', Validators.required],
      date: ['', Validators.required],
      shift_place: ['', Validators.required],
      guards: ['', Validators.required],
    })
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
    .then(() => {
      this.createShiftForm.value.guards = this.guardsIds;
      console.log(this.createShiftForm.value);
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

  datepicker(e) {
    e.preventDefault()
  }

  add(chip) {
    // aqui igualar el chip.tag a la variable q guarda el dato del formulario
    console.log(chip.tag);
    this.guardsSelected.push(chip.tag)
  }
}
