import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.interface';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

      const user: User = JSON.parse(sessionStorage.getItem("user"))
      
      if (user) {
      const authJwtToken = user.accessToken;
      const cloned = req.clone({
        headers: req.headers
          .set('Authorization', `Bearer ${authJwtToken}`)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
