import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-shift',
  templateUrl: './create-shift.component.html',
  styleUrls: ['./create-shift.component.css']
})
export class CreateShiftComponent implements OnInit {

  createShiftForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.createShiftForm = this.createCreateShiftForm();
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

  }
}
