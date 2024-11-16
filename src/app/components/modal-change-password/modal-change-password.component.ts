import { Component, Input } from '@angular/core';
import { ClientAccountService } from 'src/app/services/client-account.service';

@Component({
  selector: 'app-modal-change-password',
  templateUrl: './modal-change-password.component.html',
  styleUrls: ['./modal-change-password.component.css']
})
export class ModalChangePasswordComponent {
  @Input() account: any;  // Recibe los datos de la cuenta
  isLoading = false;  // Para controlar el estado de carga
  errorMessage: string | null = null;  // Para mostrar mensajes de error
  remainingTime: number = 0;  // Tiempo restante en segundos
  timer: any;  // Para almacenar el interval que actualiza el contador

  constructor(private clientAccountService: ClientAccountService) { }

  // Método que será llamado cuando el usuario haga clic en "Solicitar código"
  onGenerate2FACode() {
    console.log('Solicitud de código 2FA iniciada');
    


    if (this.isLoading) {
      console.log('Ya se está generando un código, espera.');
      return;
    }

    this.isLoading = true;  // Muestra el spinner
    this.errorMessage = null;  // Resetea cualquier mensaje de error

    console.log('Enviando solicitud de código...');
    
    this.clientAccountService.generate2FACode().subscribe(
      response => {
        console.log('Código 2FA enviado:', response);
        this.isLoading = false;  // Detiene el spinner
        this.startCountdown();  // Inicia el contador
      },
      error => {
        this.isLoading = false;  // Detiene el spinner
        this.errorMessage = 'Ocurrió un error al solicitar el código. Intenta de nuevo.';  // Mostrar mensaje de error
        console.error('Error al solicitar código 2FA:', error);
      }
    );
  }

  // Inicia el contador para la espera
  startCountdown() {
    console.log('Iniciando contador...');
    
    this.remainingTime = 120;  // 2 minutos en segundos
    this.timer = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        clearInterval(this.timer);  // Detiene el contador cuando llega a 0
      }
    }, 1000);
  }

  // Método para verificar si se puede solicitar otro código
  canRequestCode() {
    return this.remainingTime === 0;  // Solo se puede solicitar el código si el contador es 0
  }
}
