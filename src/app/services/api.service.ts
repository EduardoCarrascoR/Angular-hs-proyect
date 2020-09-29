import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { User } from "../models/user.interface";
import { Guard } from "../models/guard.interface";
import { Client } from "../models/client.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.url + '/auth/login', { email, password })
  }

  getGuards(): Observable<Guard> {
    return this.http.get<Guard>(this.url + '/auth/guards')
  }

  getClients(): Observable<Client> {
    return this.http.get<Client>(this.url + '/auth/clients')
  }

}
