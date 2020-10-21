import { Component, OnInit, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toast } from 'angular2-materialize';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { MaterializeAction } from "angular2-materialize";

@Component({
  selector: 'app-create-shift',
  templateUrl: './create-shift.component.html',
  styleUrls: ['./create-shift.component.css']
})
export class CreateShiftComponent implements OnInit {

  chipsActions = new EventEmitter<string|MaterializeAction>();
  autocompleteInit = {
    autocompleteOptions: {
      data: {},
      limit: Infinity,
      minLength: 1
    }
  };

  createShiftForm: FormGroup;
  types: Observable<any>
  public typeWrong = null;
  guards: any
  guardsId: number[] = []

  constructor(
    public formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.createShiftForm = this.createCreateShiftForm();
    this.api.getGuards().subscribe(guards => {
      this.guards = guards;
    });
  }

  private createCreateShiftForm() {
    return this.formBuilder.group({
      type: ['', Validators.required],
      start: ['', Validators.required],
      finish: ['', Validators.required],
      date: ['', Validators.required],
      shift_place: ['', Validators.required],
    })
  }

  addShift() {
    if(this.createShiftForm.value.type === 'diurno') {
      this.createShiftForm.value.type = 'Day'
    } else if(this.createShiftForm.value.type === 'vespertino') {
      this.createShiftForm.value.type = 'Night'
    } else {
      toast('Turno debe ser diurno o vespertino')
      throw Error('Error en tipo de turno')
    }
    console.log(this.createShiftForm.value.type,this.createShiftForm.value.start,this.createShiftForm.value.finish, this.createShiftForm.value.date, this.createShiftForm.value.shift_place, this.guards)
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
    for(let guard of this.guards.guards) {
      console.log(guard, guard.firstname + " " + guard.lastname, chip.tag);
      let name = String(guard.firstname.concat(" ").concat(guard.laststname));
      console.log(name == String(chip.tag));
      if( name == String(chip.tag)){ console.log(chip.tag) } else { console.error("Error");
      }
    }
    
    // aqui igualar el chip.tag a la variable q guarda el dato del formulario
  }

  delete(chip) {
    console.log("Chip deleted: " + chip.tag);
  }

  select(chip) {
    console.log("Chip selected: " + chip.tag);
  }
}
