import { Component, OnInit, OnDestroy } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { interval, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verifyaccount.component.html',
  styleUrls: ['./verifyaccount.component.css']
})
export class VerifyAccountComponent implements OnInit, OnDestroy {
  userEmail: string = ''; // Deberías asignar el valor del email del usuario
  retryAfter: number | null = null; // Tiempo de espera en segundos
  countdown: string = ''; // Tiempo de espera formateado para mostrar en la UI
  countdownSubscription: Subscription | null = null; // Suscripción para el temporizador
  loading: boolean = false; // Estado de carga para mostrar el loader

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userEmail = decodedToken.email;

      // Verificar si ya ha pasado el tiempo de espera para el reenvío del email
    }
  }

  resendVerification() {
    this.loading = true; // Mostrar loader
    this.authService.sendVerificationEmail(this.userEmail).subscribe(
      response => {
        // Manejo de la respuesta exitosa
        this.loading = false; // Ocultar loader
        this.retryAfter = null; // Restablecer tiempo de espera
        this.countdown = ''; // Limpiar el contador
      },
      error => {
        if (error.status === 429) {
          // Si el error es 429, muestra el tiempo de espera
          this.retryAfter = error.error.retry_after;
          this.startCountdown();
        } else {
          // Manejo de otros errores
          console.error('Error al reenviar el email de verificación:', error);
          alert('Error al reenviar el email de verificación. Intenta nuevamente.');
        }
        this.loading = false; // Ocultar loader
      }
    );
  }

  startCountdown() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe(); // Limpiar la suscripción anterior
    }

    this.countdownSubscription = interval(1000).subscribe(() => {
      if (this.retryAfter && this.retryAfter > 0) {
        this.retryAfter--;
        const minutes = Math.floor(this.retryAfter / 60);
        const seconds = this.retryAfter % 60;
        this.countdown = `${minutes} min ${seconds} sec`;
      }
      if (this.retryAfter === 0) {
        this.countdownSubscription?.unsubscribe();
        this.countdown = 'Retry now'; // Mensaje cuando el contador llegue a 0
      }
    });
  }

  ngOnDestroy() {
    // Limpiar la suscripción cuando el componente se destruye
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  destroyToken(){
    localStorage.removeItem('jwt');
  }
}
