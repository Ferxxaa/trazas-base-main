import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAc5HAo7yn2liFCEfJ4sn2yhhv0I4HDT0A",
  authDomain: "intranet-59959.firebaseapp.com",
  databaseURL: "https://intranet-59959-default-rtdb.firebaseio.com",
  projectId: "intranet-59959",
  storageBucket: "intranet-59959.firebasestorage.app",
  messagingSenderId: "709530000459",
  appId: "1:709530000459:web:2411db92132e850034c1ce",
  measurementId: "G-0CH68MVRDM"
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);

// Inicializar la base de datos
const db = getDatabase(app);
const auth = getAuth(app); // Si estás usando autenticación
const analytics = getAnalytics(app);

export { db, auth }; 