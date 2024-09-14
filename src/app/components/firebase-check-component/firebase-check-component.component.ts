import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-firebase-check-component',
  templateUrl: './firebase-check-component.component.html',
  styleUrls: ['./firebase-check-component.component.css']
})
export class FirebaseCheckComponentComponent {
  firebaseConfig = environment.firebaseConfig;

  status: string = '';

  constructor(private afAuth: AngularFireAuth) {}
  ngOnInit(): void {
    this.checkFirebaseConnection();
  }

  async checkFirebaseConnection(): Promise<void> {
    try {
      // Intenta autenticar con un proveedor de Google
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);

      if (result.user) {
        this.status = 'Conexión a Firebase exitosa. Usuario autenticado: ' + result.user.email;
      } else {
        this.status = 'Conexión a Firebase exitosa pero no se ha autenticado ningún usuario.';
      }
    } catch (error) {
      console.error('Error al verificar la conexión a Firebase:', error);
      this.status = 'Error al conectar con Firebase: ' + error;
    }
  }
}
