import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

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

          // Verifica el rol en el payload
          if (payload.rol !== 1) { // 1 es el rol de admin, ajusta según tu lógica
            // El rol no es admin, redirigir a otra página
            this.router.navigate(['/home']);
            return false;
          }

          return true;
        } else {
          // Token inválido, redirigir al login
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        // En caso de error, redirigir al login
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
