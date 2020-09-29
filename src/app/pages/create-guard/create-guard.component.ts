import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-create-guard',
  templateUrl: './create-guard.component.html',
  styleUrls: ['./create-guard.component.css']
})
export class CreateGuardComponent implements OnInit {
  
  createGuardForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createGuardForm = this.createCreateGuardForm()
  }

  private createCreateGuardForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
    })
  }

}
