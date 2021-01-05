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
}
