import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-security-account-game',
  templateUrl: './security-account-game.component.html',
  styleUrls: ['./security-account-game.component.css']
})
export class SecurityAccountGameComponent {
  @Input() account: any;  // Recibe los datos de la cuenta

}
