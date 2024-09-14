// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { signInWithPopup, GoogleAuthProvider, UserCredential } from 'firebase/auth';
import { auth } from '../firebase-config';
import { ErrorMessages } from '../enums/error-messages-enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/l2genesis_api/api';
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('jwt');
    this.tokenSubject.next(token);
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      email: email,
      password: password
    };

    return this.http.post<any>(`${this.apiUrl}/login`, body, { headers }).pipe(
      tap(response => {
        if (response.token) {
          this.saveToken(response.token);
        }
      }),
      catchError(this.handleError)
    );
  }

  async loginWithGoogle(): Promise<any> {
    const provider = new GoogleAuthProvider();
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      // Crea los encabezados con el token
      const headers = new HttpHeaders().set('X-Custom-Header', token);

      // Enviar el token al backend con GET y devolver la respuesta
      return this.http.get<any>(`${this.apiUrl}/loginWithGoogle`, { headers }).pipe(
        tap(response => {
          if (response.token) {
            this.saveToken(response.token);
          }
        }),
        catchError(this.handleError)
      ).toPromise(); // Convierte el observable en una promesa para que puedas esperar su resolución
    } catch (error) {
      console.error('Error during Google login:', error);
      throw error; // Propaga el error al componente
    }
  }


  register(data: any): Observable<any> {
    return this.http.post('http://localhost/l2genesis_api/api/register', data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error occurred:', error);
          return throwError('Hubo un problema al crear la cuenta. Intente nuevamente.');
        })
      );
  }
  

  saveToken(token: string): void {
    localStorage.setItem('jwt', token);
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }



  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'X-Custom-Header': `Bearer ${token}`
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = ErrorMessages.UNKNOWN_ERROR;
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = ErrorMessages.SERVER_ERROR;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = ErrorMessages.INVALID_CREDENTIALS;
          break;
        case 401:
        case 403:
          errorMessage = ErrorMessages.LOGIN_FAILED;
          break;
        case 500:
          errorMessage = ErrorMessages.SERVER_ERROR;
          break;
        default:
          errorMessage = ErrorMessages.UNKNOWN_ERROR;
          break;
      }
    }
    return throwError(errorMessage);
  }
  sendVerificationEmail(email: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/resend_verification`, { email }, { headers });
  }
   decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }
  

  validateToken(token: string): Observable<any> {
    const headers = new HttpHeaders().set('X-Custom-Header', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/verifyToken`, {}, { headers });
  }
  logout(): void {
    localStorage.removeItem('jwt');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión

  }
}
