import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const CustomNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert('Has cerrado sesión');
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión', error);
      });
  };

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: '#302f2f' }} variant="dark" fixed="top">
        <Container>
          {/* Logo a la izquierda */}
          <Navbar.Brand as={Link} to="/" style={{ color: '#f5f5f5', display: 'flex', alignItems: 'center' }}>
            <img 
              src="/images/intra3.png" 
              alt="Logo" 
              style={{
                width: '75px',   // Aumenta el tamaño del logo
                height: '75px',  // Mantén la proporción del logo
                marginRight: '5px',
                objectFit: 'contain'  // Asegura que el logo no se deforme
              }} 
            />
            <strong>Trazas</strong>
          </Navbar.Brand>

          {/* Collapse del menú */}
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="align-items-center">
              <Nav.Link as={Link} to="/" style={{ color: '#f5f5f5' }}>Home</Nav.Link>
              <Nav.Link as={Link} to="/multimedia" style={{ color: '#f5f5f5' }}>Multimedia</Nav.Link>
              <Nav.Link as={Link} to="/admin" style={{ color: '#f5f5f5' }}>Panel de Admin</Nav.Link>

              <Button
                variant="light"
                onClick={handleLogout}
                className="ms-2"
                style={{
                  backgroundColor: '#424242',
                  color: '#fff',
                  border: 'none'
                }}
              >
                Cerrar sesión
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>

        {/* Ícono hamburguesa en la esquina derecha */}
        <div className="d-lg-none" style={{ position: 'absolute', right: '25px', top: '40px' }}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
      </Navbar>
    </>
  );
};

export default CustomNavbar;
