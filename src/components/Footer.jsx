// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>© 2025 Mi Foro. Todos los derechos reservados.</p>
        <div style={styles.socialIcons}>
          <a href="#" style={styles.icon} aria-label="Facebook">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#" style={styles.icon} aria-label="Twitter">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#" style={styles.icon} aria-label="Instagram">
            <i className="fa fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px 0',
    textAlign: 'center',
    position: 'relative',
    bottom: 0,
    width: '100%',
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  text: {
    margin: '10px 0',
    fontSize: '14px',
  },
  socialIcons: {
    marginTop: '10px',
  },
  icon: {
    color: '#fff',
    fontSize: '20px',
    margin: '0 10px',
    textDecoration: 'none',
  },
};
