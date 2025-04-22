import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';  // Asegúrate de importar Firebase y la base de datos
import { useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';  // Importa funciones para obtener datos de Firebase
import './Login.css'; // Importa el archivo de estilos CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // Estado para manejar errores
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Inicia sesión con correo y contraseña
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Verificar el rol del usuario desde la base de datos
      const userRef = ref(db, 'usuarios/' + user.uid);  // Ruta del usuario en la base de datos
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userRole = snapshot.val().role; // Obtener el rol desde la base de datos

        if (userRole === 'admin') {
          // Si el rol es admin, redirige al panel de administración
          navigate('/admin');
        } else {
          // Si no es admin, redirige a la página principal
          navigate('/');
        }
      } else {
        setErrorMessage('No se encontró información del usuario.');
      }
    } catch (error) {
      setErrorMessage('Error al iniciar sesión: ' + error.message);  // Manejo de errores
    }
  };

  return (
    <div 
      className="login-container" 
      style={{ 
        backgroundImage: 'url(/images/fondo_login.jpg)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        height: '100vh' 
      }}
    >
      <div className="login-card">
        <img src="/images/logo_trazas.png" alt="Logo" className="logo" />
        <h2>Iniciar sesión</h2>
        
        {/* Mostrar mensaje de error si ocurre */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
