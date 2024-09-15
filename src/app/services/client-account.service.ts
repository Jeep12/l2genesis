import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientAccountService {
  private apiUrl = 'https://l2genesis.online/l2genesis_api/api'; // Asegúrate de que esta URL sea correcta

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'X-Custom-Header': `Bearer ${token}`
    });
  }

  createAccount(accountData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.apiUrl+"/registerAccountGame", accountData, { headers }).pipe(
      catchError(error => {
        console.error('Error al crear la cuenta:', error);
        return throwError(error);
      })
    );
  }
}
