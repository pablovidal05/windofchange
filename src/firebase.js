import { initializeApp } from 'firebase/app'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC9ihDOZqrFCR73KTNHi_J3nkZZa8Nu2pQ",
  authDomain: "windofchangeapp.firebaseapp.com",
  projectId: "windofchangeapp",
  storageBucket: "windofchangeapp.firebasestorage.app",
  messagingSenderId: "719254425018",
  appId: "1:719254425018:web:5835906d19127883dba183"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

// Mantiene la sesión entre recargas usando el almacenamiento local del navegador.
setPersistence(auth, browserLocalPersistence)