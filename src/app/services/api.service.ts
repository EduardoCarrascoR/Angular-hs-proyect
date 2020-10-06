import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { User } from "../models/user.interface";
import { Client } from "../models/client.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = environment.apiUrl;
  constructor(
    private http: HttpClient,
  ) {

  }

  login(rut: string, password: string): Observable<User> {
    return this.http.post<User>(this.url + '/auth/login', { rut, password })
  }

  getGuards(): Observable<User> {
    return this.http.get<User>(this.url + '/users/allGuards')
  }

  getClients(): Observable<Client> {
    return this.http.get<Client>(this.url + '/clients/all')
  }

  postClient(name: string, address: string, phone: string, email: string): Observable<Client> {
    return this.http.post<Client>(this.url + '/clients', { name, phone, email, address })
  }

  postGuard(firstname: string, lastname: string, rut: string, phone: string, email: string, password: string): Observable<User> {
    return this.http.post<User>(this.url + '/users/Guard', { firstname, lastname, rut, phone, email, password })
  }

}
