import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.authService.getToken();
    
    if (!token) {
      // No hay token, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }

    // Verifica el token en el servidor
    return this.authService.validateToken(token).pipe(
      map(response => {
        if (response.valid) {
          const payload = this.authService.decodeToken(token);

          if (payload.emailVerified === 0) {
            // Email no verificado, redirigir al componente de verificación
            this.router.navigate(['/verify-account']);
            return false;
          }

          return true;
        } else {
          // Token inválido, redirigir al login
          this.authService.logout();
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        this.authService.logout();

        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
