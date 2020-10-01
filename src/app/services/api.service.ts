import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { User } from "../models/user.interface";
import { Client } from "../models/client.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = environment.apiUrl;
  private user = JSON.parse(sessionStorage.getItem('user'))
  constructor(
    private http: HttpClient,
  ) { 
    
  }

  login(rut: string, password: string): Observable<User> {
    return this.http.post<User>(this.url + '/auth/login', { rut, password })
  }
  
  getGuards(): Observable<User> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.user.accessToken}`
    })
    return this.http.get<User>(this.url + '/users/allGuards', { headers })
  }

  getClients(): Observable<Client> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.user.accessToken}`
    })
    return this.http.get<Client>(this.url + '/clients/all', { headers })
  }

  postClient(name: string, address: string, phone: string, email: string): Observable<Client> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.user.accessToken}`
    })
    return this.http.post<Client>(this.url + '/clients', { name, address, phone, email },{ headers })
  }

  postGuard(firstname: string, lastname: string, rut: string, phone: string, email: string, password: string): Observable<User> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.user.accessToken}`
    })
    return this.http.post<User>(this.url + '/users/Guard', { firstname, lastname, rut, phone, email, password },{ headers })
  }

}
