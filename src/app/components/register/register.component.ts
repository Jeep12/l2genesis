import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  currentStep: number = 1;
  errorMessage: string = "";
  successMessage: string = '';
  validEmail = false;
  passwordMatch = false;
  passwordRequirements = {
    length: false,
    uppercase: false,
    specialChar: false,
    number: false
  };

  loading = false;

  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]], // Asegúrate de que sea 8
      confirmPassword: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]]
    });

    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      this.checkPasswordRequirements(value);
    });

    this.registerForm.get('confirmPassword')?.valueChanges.subscribe(value => {
      this.checkPasswordMatch(value);
    });
  }

  nextStep() {
    if (this.currentStep === 1) {
      if (!this.isEmailValid()) {
        this.messageError("Error: Email inválido");
        return;
      } else {
        this.errorMessage = ''; // Limpiar el mensaje de error si el email es válido
      }
    } else if (this.currentStep === 2) {
      if (!this.passwordMatch) {
        this.messageError("Error: Las contraseñas no coinciden");
        return;
      }
      if (!this.passwordRequirements.length || !this.passwordRequirements.uppercase || !this.passwordRequirements.specialChar || !this.passwordRequirements.number) {
        this.messageError("Error: La contraseña no cumple con todos los requisitos");
        return;
      }
    }

    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit(): void {
    this.errorMessage = ''; // Resetea los mensajes de error antes de la nueva solicitud
    this.successMessage = ''; // Resetea el mensaje de éxito
    this.loading = true; // Activa el indicador de carga

    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      // Llama al servicio de autenticación para registrar el usuario
      this.authService.register(formData).subscribe(
        (response: any) => {
          this.loading = false;
          if (response && response.id) {
            // Registro exitoso
            this.successMessage = 'Cuenta creada con éxito. Verifica tu correo para activar tu cuenta.';
          } else {
            // Manejo de respuesta sin éxito
            this.errorMessage = 'Hubo un problema al crear la cuenta. Intente nuevamente.';
          }
        },
        (error) => {
          this.loading = false;
          // Maneja errores que vienen de la API
          this.errorMessage = error.error?.message || 'Ocurrió un error inesperado. Intente más tarde.';
        }
      );
    } else {
      this.loading = false;
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }

  isEmailValid(): boolean {
    this.validEmail = true;
    const emailControl = this.registerForm.get('email');
    return emailControl?.valid || false;
  }

  messageError(textError: string) {
    this.errorMessage = textError;
  }

  checkPasswordRequirements(password: string) {
    this.passwordRequirements.length = password.length >= 8;
    this.passwordRequirements.uppercase = /[A-Z]/.test(password);
    this.passwordRequirements.specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    this.passwordRequirements.number = /[0-9]/.test(password);
  }

  checkPasswordMatch(confirmPassword: string) {
    const password = this.registerForm.get('password')?.value;
    this.passwordMatch = password === confirmPassword;
  }

  // Métodos para mostrar/ocultar las contraseñas
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  onEnterPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evita el envío del formulario
      this.nextStep(); // Llama a tu función para ir al siguiente paso
    }
  }
}
