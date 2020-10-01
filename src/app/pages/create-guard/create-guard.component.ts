import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toast } from 'angular2-materialize';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-guard',
  templateUrl: './create-guard.component.html',
  styleUrls: ['./create-guard.component.css']
})
export class CreateGuardComponent implements OnInit {
  
  createGuardForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.createGuardForm = this.createCreateGuardForm()
  }

  private createCreateGuardForm() {
    return this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      rut: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  async addGuard() {
    let firstname = this.createGuardForm.value.firstname;
    let lastname = this.createGuardForm.value.lastname;
    let rut = this.createGuardForm.value.rut;
    let phone = this.createGuardForm.value.phone;
    let email = this.createGuardForm.value.email;
    let password = this.createGuardForm.value.password;
    await this.api.postGuard(firstname, lastname, rut, phone, email, password)
    console.log('post realizado')
  }

}
