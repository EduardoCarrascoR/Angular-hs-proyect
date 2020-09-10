import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  canActivate() {
    if (!this.auth.isLogged()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

  canActivateChild(){
    if (!this.auth.isLogged()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
  
}
