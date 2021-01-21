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
  variableRut
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

  rut(rut: any) {
    let div1, div2, div3, div4, formatRut;
    let data = rut.target.value

    switch (data.length) {
      case 1:
        return data;
      case 2:
        return data;
      case 3:
        return data;
      case 4:
        return data;
      case 5:
        return data;
      case 6:
        return data;
      case 7:
        return data;
      case 8:
        div1 = data.slice(0, 1);
        div2 = data.slice(1, 4);
        div3 = data.slice(4, 7);
        div4 = data.slice(7, 8);
        formatRut = div1 + '.' + div2 + '.' + div3 + '-' + div4
        this.variableRut = formatRut
        break;
      case 9:
        div1 = data.slice(0, 2);
        div2 = data.slice(2, 5);
        div3 = data.slice(5, 8);
        div4 = data.slice(8, 9);
        formatRut = div1 + '.' + div2 + '.' + div3 + '-' + div4
        this.variableRut = formatRut
        break;
      }
      return this.variableRut

  }

}
