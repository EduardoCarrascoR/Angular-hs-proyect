import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { User } from "../models/user.interface";
import { Client } from "../models/client.interface";
import { Report } from "../models/report.interface";
import { Shift, ShiftPages } from '../models/shift.interface';

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

  createShift(newShift: Shift): Observable<Shift> {
    return this.http.post<Shift>(this.url + '/shifts', newShift)
  }

  getGuards(): Observable<User> {
    return this.http.get<User>(this.url + '/users/allGuards')
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url + '/clients/all')
  }

  getShifts(page: number, limit: number, date?: Date, client?: number): Observable<Shift> {
    if (date && !client) {
      return this.http.post<Shift>(this.url + '/shifts/pagiShift', { page, limit, date })
    } else if (date && client) {
      return this.http.post<Shift>(this.url + '/shifts/pagiShift', { page, limit, date, client })
    } else if (!date && !client) {
      return this.http.post<Shift>(this.url + '/shifts/pagiShift', { page, limit })
    } else  if(!date && client){
      return this.http.post<Shift>(this.url + '/shifts/pagiShift', { page, limit, client })
    }
  }
  
  postClient(name: string, address: string, phone: string, email: string): Observable<Client> {
    return this.http.post<Client>(this.url + '/clients', { name, phone, email, address })
  }
  
  postGuard(firstname: string, lastname: string, rut: string, phone: string, email: string, password: string): Observable<User> {
    return this.http.post<User>(this.url + '/users/Guard', { firstname, lastname, rut, phone, email, password })
  }
  
  getReports(): Observable<Report> {
    return this.http.get<Report>(this.url + '/reports/monthReport')
  }

  getReportsByClientIdAndDate(clientId: number, date: string): Observable<any> {
    return this.http.get<any>(this.url + `/clients/reportClient/${clientId}/date/${date}`)
  }

  sendReport(shiftId:number, client: number): Observable<any> {
    return this.http.get<any>(this.url + `/shifts/pdf/${shiftId}/client/${client}`)
  }
}
