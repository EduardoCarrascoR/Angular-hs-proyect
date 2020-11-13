import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Shift, ShiftPages } from '../../models/shift.interface';
import { MaterializeAction } from 'angular2-materialize'

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.css']
})
export class ShiftsComponent implements OnInit {

  $shifts: Observable<any>;
  shiftsForm: FormGroup;
  shiftSelected: Shift;
  
  modalActions = new EventEmitter<string|MaterializeAction>();
  
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.shiftsForm = this.updateShiftsForm()
    let pagination: ShiftPages = {
      page: 1,
      limit: 10
    } 
    this.$shifts = this.api.getShifts( pagination.page, pagination.limit )
  }

  private updateShiftsForm() {
    return this.formBuilder.group({
      page: ['', Validators.required],
      limit: ['', Validators.required],
    })
  }

  addUpdateShift() {

  }

  
  openModal(shift: Shift) {
    this.shiftSelected = shift
    if(this.shiftSelected){
      this.modalActions.emit({action:"modal",params:['open']});
    }
  }
  closeModal() {
    this.shiftSelected = null;
    this.modalActions.emit({action:"modal",params:['close']});
  }

}
