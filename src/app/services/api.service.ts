import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { User } from "../models/user.interface";
import { Client } from "../models/client.interface";
import { Shift } from '../models/shift.interface';

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

  createShift(type: string, start: string, finish: string, dates: string[], shiftPlace: string, guardsIds: number[]): Observable<Shift> {
    return this.http.post<Shift>(this.url + '/shifts', { type, start, finish, dates, shiftPlace, guardsIds })
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
