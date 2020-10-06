import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toast } from 'angular2-materialize';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-shift',
  templateUrl: './create-shift.component.html',
  styleUrls: ['./create-shift.component.css']
})
export class CreateShiftComponent implements OnInit {

  createShiftForm: FormGroup;
  types: Observable<any>
  public typeWrong = null;
  public guards$: Observable<any>

  constructor(
    public formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.createShiftForm = this.createCreateShiftForm();
    this.guards$ = this.api.getGuards()
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
}
