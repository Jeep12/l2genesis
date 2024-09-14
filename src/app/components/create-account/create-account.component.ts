import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientAccountService } from 'src/app/services/client-account.service';
import { AuthService } from 'src/app/services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  createAccountForm: FormGroup;
  userEmail: string = '';
  passwordVisibility: string = 'password'; // Default to hidden
  confirmPasswordVisibility: string = 'password'; // Default to hidden

  constructor(
    private fb: FormBuilder,
    private accountClientService: ClientAccountService,
    private authService: AuthService
  ) {
    this.createAccountForm = this.fb.group({
      accountName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userEmail = decodedToken.email;
    }
  }

  // Validator to ensure password and confirmPassword match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.passwordVisibility = this.passwordVisibility === 'password' ? 'text' : 'password';
  }

  // Toggle confirm password visibility
  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisibility = this.confirmPasswordVisibility === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    if (this.createAccountForm.valid) {
      const accountData = {
        login: this.createAccountForm.value.accountName, // Enviar el valor de accountName como login
        email: this.userEmail, // Enviar el email recuperado
        password: this.createAccountForm.value.password // Enviar la contraseña
      };

      // Imprimir los datos en formato JSON en la consola

      // Llamar al servicio para crear la cuenta
      this.accountClientService.createAccount(accountData).subscribe(
        response => {
          alert("Cuenta creada con exito");
        },
        error => {
          alert('Error al crear la cuenta');
        }
      );
    } else {
      alert('Formulario inválido');
    }
  }
}
