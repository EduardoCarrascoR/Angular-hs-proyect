import { Injectable, NgZone } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { User } from '../models/user.interface';
import { toast } from 'angular2-materialize';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User = JSON.parse(localStorage.getItem('user'));

  constructor(
    private api: ApiService,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public router: Router, // para enviar al usuario a otra vista
  ) { }

  login(email, password){
    this.api.login(email, password)
      .subscribe(
        (userData: any) => {
          localStorage.setItem('user', JSON.stringify(userData.user));
          toast('Login correcto', 3000);
          this.ngZone.run(() => {
            this.router.navigate(['/dashboard/home']);
          });
        }, err => {
          toast(`Email y/o contraseña incorrectas`, 3000);
        }
      );
  }

  logout(){
    localStorage.removeItem('user');
    this.ngZone.run(() => {
      this.router.navigate(['home']);
    });
  }

  isLogged() {
    if (localStorage.getItem("user") == null) {
      return false;
    }
    else {
      return true;
    }
  }

  userData(){
    return JSON.parse(localStorage.getItem('user'));
  }
  
}
