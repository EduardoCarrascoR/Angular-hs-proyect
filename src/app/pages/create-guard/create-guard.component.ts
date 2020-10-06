import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toast } from 'angular2-materialize';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-create-guard',
  templateUrl: './create-guard.component.html',
  styleUrls: ['./create-guard.component.css']
})
export class CreateGuardComponent implements OnInit {
  
  createGuardForm: FormGroup;

  constructor(
    private router: Router,
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

  addGuard() {
    let firstname = this.createGuardForm.value.firstname;
    let lastname = this.createGuardForm.value.lastname;
    let rut = this.createGuardForm.value.rut;
    let phone = this.createGuardForm.value.phone;
    let email = this.createGuardForm.value.email;
    let password = this.createGuardForm.value.password;
    this.api.postGuard(firstname, lastname, rut, phone, email, password).toPromise()
      .then((res: any) => {
        console.log(res);
        toast('Guardia creado correctamente', 3000)
        this.router.navigate(['/dashboard/guards'])
      })
      .catch(err => {
        toast('Error al crear guardia', 3000)
      })
  }

}
