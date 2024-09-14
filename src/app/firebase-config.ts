// src/app/firebase/firebase-config.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { environment } from '../environments/environment';

// Configuración de Firebase
const firebaseConfig = environment.firebaseConfig;

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const firestore = getFirestore(app);
