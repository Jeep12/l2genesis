// src/app/components/login/login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isPasswordVisible: boolean = false;
  message: string = '';  // Para mostrar mensajes de error

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: response => {
        this.router.navigate(['/dashboard']);
        
      },
      error: errorMessage => {
        this.message = errorMessage;  // Mostrar mensaje de error
      }
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(() => {
      this.authService.token$.pipe(take(1)).subscribe(token => {
        if (token) {
          this.router.navigate(['/dashboard']);
        }
      });
    }).catch(error => {
      this.message = error;  // Mostrar mensaje de error
    });
  }
  

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  get passwordFieldType(): string {
    return this.isPasswordVisible ? 'text' : 'password';
  }
}
