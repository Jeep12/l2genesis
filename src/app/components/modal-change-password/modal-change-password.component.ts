import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-change-password',
  templateUrl: './modal-change-password.component.html',
  styleUrls: ['./modal-change-password.component.css']
})
export class ModalChangePasswordComponent {
  @Input() account: any;  // Recibe los datos de la cuenta
}
