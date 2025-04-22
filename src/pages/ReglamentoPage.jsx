import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const ReglamentoPage = () => {
  const navigate = useNavigate(); // Crear instancia de navigate

  // Estilo del botón
  const btnStyle = {
    fontSize: '0.8rem',  // Reducir el tamaño de la fuente
    padding: '8px 16px',  // Reducir el padding
    backgroundColor: '#b32400',  // Fondo rojo oscuro
    border: '2px solid #b32400',  // Borde de color rojo oscuro
    borderRadius: '10px',  // Borde redondeado
    textAlign: 'center',  // Alinear el texto al centro
    color: 'white',  // Color del texto
    fontWeight: 'bold',  // Hacer el texto en negrita
    transition: 'background-color 0.3s, border-color 0.3s',  // Transición suave
  };

  // Función para hover
  const hoverBtn = (e, enter) => {
    e.target.style.backgroundColor = enter ? '#e57373' : '#b32400';
    e.target.style.borderColor = enter ? '#e57373' : '#b32400';
  };

  // Función para ir atrás
  const handleBack = () => {
    navigate(-1); // Navegar hacia la página anterior
  };

  return (
    <div>
      <Navbar />

      <div
        style={{
          paddingTop: '120px',
          backgroundImage: 'url(/images/marmol3.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <Container className="py-5 text-center">
          <h1 style={{ color: '#e60000', fontSize: '2.5rem', fontWeight: 'bold' }}>Descargar Documentos del Reglamento</h1>
          <p>Puedes descargar los siguientes documentos reglamentarios:</p>

          <Row className="justify-content-center mt-4">
            <Col md={4} className="mb-3">
              <a href="/docs/reglamento_interno.pdf" download>
                <Button
                  variant="danger"
                  size="lg"
                  block
                  onMouseEnter={(e) => hoverBtn(e, true)} 
                  onMouseLeave={(e) => hoverBtn(e, false)}
                  style={btnStyle}
                >
                  📄 Descargar Reglamento Interno
                </Button>
              </a>
            </Col>
            <Col md={4} className="mb-3">
              <a href="/docs/manual_convivencia.pdf" download>
                <Button
                  variant="dark"
                  size="lg"
                  block
                  onMouseEnter={(e) => hoverBtn(e, true)} 
                  onMouseLeave={(e) => hoverBtn(e, false)}
                  style={btnStyle}
                >
                  📘 Descargar SubContrato
                </Button>
              </a>
            </Col>
          </Row>

          {/* Botón de Atrás sin flecha */}
          <Row className="justify-content-center mt-5">
            <Col md={4}>
              <Button
                onClick={handleBack}
                style={btnStyle}
                block
                onMouseEnter={(e) => hoverBtn(e, true)}
                onMouseLeave={(e) => hoverBtn(e, false)}
              >
                Regresar
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ReglamentoPage;
