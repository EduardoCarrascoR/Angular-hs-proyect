import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  variableRut
  constructor(
    public formBuilder: FormBuilder,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public router: Router, // para enviar al usuario a otra vista
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  private createLoginForm() {
    return this.formBuilder.group({
      rut: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(){
    let rut = this.loginForm.value.rut;
    let password = this.loginForm.value.password;
    this.auth.login(rut, password)
  }

  rut(rut: any) { // format rut8 and 9 digit
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
