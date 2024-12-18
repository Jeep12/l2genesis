import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientAccountService {
  private apiUrl = 'http://localhost/l2genesis_api/api';

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
    return this.http.post<any>(this.apiUrl + "/registerAccountGame", accountData, { headers }).pipe(
      catchError(error => {
        console.error('Error al crear la cuenta:', error);
        return throwError(error);
      })
    );
  }
  getMyAccounts(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/myAccounts`, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener cuentas:', error);
        return throwError(error);
      })
    );
  }

  generate2FACode(): Observable<any> {
    const headers = this.getAuthHeaders(); // Usar los headers con el token
    return this.http.get<any>(`${this.apiUrl}/generate2FA`, { headers }).pipe(
      catchError(error => {
        console.error('Error al generar el código 2FA:', error);
        return throwError(error);
      })
    );
  }


  changePassword(login: string, newPassword: string, verificationCode: string): Observable<any> {
    const headers = this.getAuthHeaders(); // Usar los headers con el token
    const body = { login, newPassword, verificationCode }; // Crear el cuerpo de la solicitud
  
    // Llamada HTTP para cambiar la contraseña
    return this.http.post<any>(`${this.apiUrl}/changePassword`, body, { headers }).pipe(
      catchError(error => {
        console.error('Error al cambiar la contraseña:', error);
        return throwError(error);
      })
    );
  }
  


}
