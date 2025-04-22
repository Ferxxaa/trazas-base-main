import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';  // Asegúrate de que la ruta sea correcta
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaHome, FaClipboard, FaRegFileAlt } from 'react-icons/fa'; // Íconos actualizados

const RecursosHumanosPage = () => {
  const navigate = useNavigate();

  // Estilo del botón
  const btnStyle = {
    fontSize: '0.9rem',  // Agrandar el tamaño de la fuente
    padding: '10px 20px',  // Aumentar el padding
    backgroundColor: '#b32400',  // Fondo rojo oscuro
    border: '2px solid #b32400',  // Borde de color rojo oscuro
    borderRadius: '10px',  // Borde redondeado
    textAlign: 'center',  // Alinear el texto al centro
    color: 'white',  // Color del texto
    fontWeight: 'bold',  // Hacer el texto en negrita
    transition: 'background-color 0.3s, border-color 0.3s',  // Transición suave
    position: 'fixed',  // Fijar el botón en la parte inferior
    bottom: '20px',  // Ubicación 20px desde abajo
    left: '50%',  // Centrar el botón horizontalmente
    transform: 'translateX(-50%)',  // Ajuste para centrarlo completamente
    zIndex: 1000,  // Asegura que el botón esté encima de otros elementos
    maxWidth: '90%',  // Asegura que el botón no se desborde en pantallas pequeñas
  };

  // Función para el hover
  const hoverBtn = (e, enter) => {
    e.target.style.backgroundColor = enter ? '#e57373' : '#b32400';
    e.target.style.borderColor = enter ? '#e57373' : '#b32400';
  };

  // Función para volver atrás
  const goBack = () => {
    navigate(-1);  // Retrocede a la página anterior en el historial
  };

  return (
    <div>
      {/* Agregar el Navbar aquí */}
      <Navbar />

      {/* Fondo de imagen */}
      <div
        style={{
          paddingTop: '120px',  // Aumentar el espacio superior para evitar que el contenido toque el navbar
          backgroundImage: 'url(/images/marmol3.jpg)',  // Ruta de la imagen de fondo
          backgroundSize: 'cover',  // Hace que la imagen cubra toda la pantalla
          backgroundPosition: 'center',  // Centra la imagen
          minHeight: '100vh',  // Asegura que el fondo cubra toda la altura de la pantalla
        }}
      >
        {/* Botones de navegación arriba */}
        <Container className="py-5">
          {/* Título principal */}
          <Row className="justify-content-center mb-4">
            <Col md={12} className="text-center">
              <h1 style={{ color: '#e60000', fontSize: '2.5rem', fontWeight: 'bold' }}>Representante de Recuersos Humanos</h1>
            </Col>
          </Row>

          {/* Sección de trabajador con imagen, nombre y contacto */}
          <Row className="justify-content-center">
            <Col md={6} className="text-center mb-4">
              <Card className="shadow-lg" style={{ backgroundColor: '#ffffff', border: '1px solid #d7a77e' }}>
                <Card.Img
                  variant="top"
                  src="/images/Nelson.png" // Imagen del trabajador
                  style={{ maxHeight: '450px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title style={{ color: '#e60000' }}>Nelson Muñoz</Card.Title>
                  <Card.Text>
                    <strong>Contacto:</strong> nmunoz@trazas.cl
                    <br />
                    <strong>Teléfono:</strong> 6194 5892
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Información adicional */}
          <Row className="justify-content-center">
            <Col md={12} className="text-center">
              <p>Página de contacto con el equipo de Recursos Humanos.</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Botón Volver Atrás */}
      <Button
        style={btnStyle}
        onClick={goBack}  // Llamar a la función para retroceder
        onMouseEnter={(e) => hoverBtn(e, true)}
        onMouseLeave={(e) => hoverBtn(e, false)}
      >
        Regresar
      </Button>
    </div>
  );
};

export default RecursosHumanosPage;
