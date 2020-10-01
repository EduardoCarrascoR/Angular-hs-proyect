import { Injectable, NgZone } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { User } from '../models/user.interface';
import { toast } from 'angular2-materialize';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User = JSON.parse(sessionStorage.getItem('user'));

  constructor(
    private api: ApiService,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public router: Router, // para enviar al usuario a otra vista
  ) { }

  login(rut, password){
    this.api.login(rut, password)
      .subscribe(
        (userData: any) => {
          sessionStorage.setItem('user', JSON.stringify(userData.data));
          toast('Login correcto', 3000);
          this.ngZone.run(() => {
            this.router.navigate(['/dashboard/home']);
          });
        }, err => {
          toast(`Rut y/o contraseña incorrectas`, 3000);
        }
      );
  }

  logout(){
    sessionStorage.removeItem('user');
    this.ngZone.run(() => {
      this.router.navigate(['/login']);
    });
  }

  isLogged() {
    if (sessionStorage.getItem("user") == null) {
      return false;
    }
    else {
      return true;
    }
  }

  userData(){
    return JSON.parse(sessionStorage.getItem('user'));
  }
  
}
