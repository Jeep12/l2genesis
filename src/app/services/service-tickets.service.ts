import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceTicketsService {

  private apiUrl= "https://l2genesis.online/vps_api/api/gettickets";

  constructor(private http: HttpClient) { }

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  addTicket(){
    
  }
}
