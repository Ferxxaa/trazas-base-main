import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Modal, Accordion } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const ReglamentoPage = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate(); // Crear instancia de navigate

  const items = [
    {
      id: 1,
      img: '/images/.png',
      title: 'Política de Asistencia',
      content: (
        <>
          <p>
            <strong>Responsabilidades:</strong> Responsable de la coordinación diaria de Subcontratos, capataces y supervisión de mano de obra directa en el ámbito de ejecución eficiente dentro de los alcances establecidos en procedimientos y programas de logística, calidad, seguridad y medio ambientales. Tiene facultad de tomar acciones correctivas y sanciones según corresponda.
          </p>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Roles</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Capacidad de liderazgo</li>
                  <li>Capacidad de dirigir a los colaboradores</li>
                  <li>Habilidades de comunicación</li>
                  <li>Capacidad analítica y razonamiento</li>
                  <li>Capacidad para priorizar tareas y organizar el tiempo de manera efectiva</li>
                  <li>Máxima productividad y preocupación por la obtención de resultados</li>
                  <li>Enfoque por la seguridad en todo momento</li>
                  <li>Capacidad de anticipación</li>
                  <li>Empeño por lograr la satisfacción del cliente</li>
                  <li>Conocen de los riesgos de su entorno</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </>
      ),
    },
    {
      id: 2,
      img: '/images/regla2.jpg',
      title: 'Normas de Convivencia',
      content: (
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Detalles</Accordion.Header>
            <Accordion.Body>
              Fomentamos el respeto, la inclusión y la colaboración entre todos los miembros del equipo. Los conflictos deberán ser tratados de forma constructiva.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ),
    },
    {
      id: 3,
      img: '/images/regla3.jpg',
      title: 'Código de Vestimenta',
      content: (
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Detalles</Accordion.Header>
            <Accordion.Body>
              Se solicita mantener una presentación personal adecuada, respetando el entorno profesional de la empresa. Días casuales serán informados oportunamente.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ),
    },
    {
      id: 4,
      img: '/images/regla4.jpg',
      title: 'Uso de Recursos',
      content: (
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Detalles</Accordion.Header>
            <Accordion.Body>
              Los equipos y recursos deben usarse exclusivamente para fines laborales. Cuidar los materiales compartidos es responsabilidad de todos.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ),
    },
  ];

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
    position: 'fixed',  // Fijar el botón en la parte inferior
    bottom: '20px',  // Ubicación 20px desde abajo
    left: '50%',  // Centrar el botón horizontalmente
    transform: 'translateX(-50%)',  // Ajuste para centrarlo completamente
    zIndex: 1000,  // Asegura que el botón esté encima de otros elementos
    maxWidth: '90%',  // Asegura que el botón no se desborde en pantallas pequeñas
  };

  // Función para hover
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
        <Container className="py-5">
          <Row className="justify-content-center mb-4">
            <Col md={12} className="text-center">
              <h1 style={{ color: '#e60000', fontSize: '2.5rem', fontWeight: 'bold' }}>Roles y Responsabilidades</h1>
              <p>Haz clic en una imagen para conocer más detalles del reglamento.</p>
            </Col>
          </Row>

          <Row className="text-center">
            {items.map((item) => (
              <Col key={item.id} md={6} className="mb-4">
                <h5 style={{ marginBottom: '10px', color: '#333', fontWeight: '600' }}>{item.title}</h5>
                <img
                  src={item.img}
                  alt={item.title}
                  onClick={() => setSelected(item)}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                  }}
                />
              </Col>
            ))}
          </Row>
        </Container>

        <Modal show={selected !== null} onHide={() => setSelected(null)} centered size="lg">
          {selected && (
            <Card style={{ border: 'none' }}>
              <Card.Img variant="top" src={selected.img} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{selected.title}</Card.Title>
                <Card.Text>{selected.content}</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Modal>
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

export default ReglamentoPage;
