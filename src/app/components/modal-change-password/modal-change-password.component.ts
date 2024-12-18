import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ClientAccountService } from 'src/app/services/client-account.service';

@Component({
  selector: 'app-modal-change-password',
  templateUrl: './modal-change-password.component.html',
  styleUrls: ['./modal-change-password.component.css']
})
export class ModalChangePasswordComponent implements OnChanges {
  @Input() account: any; // Recibe los datos de la cuenta
  isLoading = false; // Para controlar el estado de carga
  errorMessage: string | null = null; // Para mostrar mensajes de error
  successMessage: string | null = null; // Para mostrar mensaje de éxito
  remainingTime: number = 0; // Tiempo restante en segundos
  timer: any; // Para almacenar el interval que actualiza el contador

  newPassword: string = ''; // Nueva contraseña ingresada por el usuario
  repeatPassword: string = ''; // Repetición de la nueva contraseña
  verificationCode: string = ''; // Código ingresado por el usuario

  constructor(private clientAccountService: ClientAccountService) { }

  // Detecta los cambios de la cuenta seleccionada y resetea los valores
  ngOnChanges(changes: SimpleChanges) {
    if (changes['account'] && this.account) {
      this.resetForm();
    }
  }

  // Método que resetea los campos del formulario
  resetForm() {
    this.newPassword = '';
    this.repeatPassword = '';
    this.verificationCode = '';
    this.errorMessage = null;
    this.successMessage = null;
    this.remainingTime = 0;
    clearInterval(this.timer); // Detener cualquier contador en curso
  }

  // Método que será llamado cuando el usuario haga clic en "Solicitar código"
  onGenerate2FACode() {
    if (this.isLoading) {
      return; // Si ya hay una solicitud en curso, no hace nada
    }

    this.isLoading = true; // Muestra el spinner
    this.errorMessage = null; // Resetea cualquier mensaje de error
    this.successMessage = null; // Resetea el mensaje de éxito

    this.clientAccountService.generate2FACode().subscribe(
      response => {
        console.log('Código 2FA enviado:', response);

        // Si la API no devuelve un mensaje de espera, inicia un nuevo contador desde 120 segundos
        if (response.retry_after === undefined) {
          this.startCountdown(120);
        } else {
          // Si devuelve un tiempo de espera, inicia el contador desde ese valor
          this.startCountdown(response.retry_after);
        }
        this.isLoading = false; // Detiene el spinner
      },
      error => {
        this.isLoading = false; // Detiene el spinner
        if (error.error && error.error.retry_after) {
          this.startCountdown(error.error.retry_after);
          this.errorMessage = error.error.message; // Muestra el mensaje de la API
        } else {
          this.errorMessage = 'Ocurrió un error al solicitar el código. Intenta de nuevo.'; // Mensaje genérico
        }

        console.error('Error al solicitar código 2FA:', error);
      }
    );
  }

  // Inicia el contador para la espera
  startCountdown(seconds: number) {
    this.remainingTime = seconds; // Configura el contador con el valor recibido
    clearInterval(this.timer); // Asegura que no haya contadores previos corriendo

    this.timer = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        clearInterval(this.timer); // Detiene el contador cuando llega a 0
      }
    }, 1000);
  }

  // Método para verificar si se puede solicitar otro código
  canRequestCode() {
    return this.remainingTime === 0; // Solo se puede solicitar el código si el contador es 0
  }

  changePassword() {
    if (this.newPassword === this.repeatPassword) {
      this.isLoading = true; // Mostrar el spinner
      this.errorMessage = null; // Limpiar cualquier mensaje de error
      this.successMessage = null; // Limpiar el mensaje de éxito

      // Llamada a la API para cambiar la contraseña
      this.clientAccountService.changePassword(
        this.account.login,   // Ahora enviamos el login, no el email
        this.newPassword,     // La nueva contraseña
        this.verificationCode // El código de verificación
      ).subscribe(
        response => {
          this.isLoading = false; // Detener el spinner
          this.successMessage = response.message; // Mostrar el mensaje de éxito
          this.newPassword = ''; // Nueva contraseña ingresada por el usuario
          this.repeatPassword = '';

          // Hacer desaparecer el mensaje de éxito después de 3 segundos
     
        },
        error => {
          this.isLoading = false; // Detener el spinner
          // Manejo del mensaje de error
          if (error.error.message) {
            this.errorMessage = error.error.message; // Mostrar el mensaje de error específico
          } else {
            this.errorMessage = 'Error desconocido'; // Mensaje genérico
          }

          // Hacer desaparecer el mensaje de error después de 3 segundos
 

          console.error('Error al cambiar la contraseña:', error);
        }
      );
    } else {
      this.errorMessage = 'Las contraseñas no coinciden.'; // Mostrar mensaje si las contraseñas no coinciden

   
    }
  }
}
