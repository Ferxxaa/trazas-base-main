import React, { useState } from 'react';
import { Container, Row, Col, Card, Image, Button, Form, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PoliticaPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [reporte, setReporte] = useState('');
  const [categoria, setCategoria] = useState('consulta'); // Estado para la categoría
  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (reporte.trim() === '') return;

    const reportesPrevios = JSON.parse(localStorage.getItem('reportes')) || [];
    const nuevoReporte = {
      id: Date.now(),
      texto: reporte,
      fecha: new Date().toLocaleString(),
      categoria: categoria, // Agregar la categoría al reporte
    };

    const reportesActualizados = [...reportesPrevios, nuevoReporte];
    localStorage.setItem('reportes', JSON.stringify(reportesActualizados));

    setReporte('');
    setCategoria('consulta'); // Restablecer la categoría por defecto
    setMensajeEnviado(true);

    setTimeout(() => setMensajeEnviado(false), 3000);
  };

  return (
    <>
      <Navbar />
      <div style={{
        paddingTop: '90px',
        backgroundImage: 'url("/images/marmol3.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        <Container className="py-5">
          <h1 className="text-center mb-5" style={{ color: '#c62828' }}>Política de Seguridad</h1>

          {/* Imagen */}
          <Row className="justify-content-center mb-5">
            <Col xs={12} md={8}>
              <Image src="/images/Politica.jpg" alt="Imagen de política" fluid rounded style={{ border: '2px solid #c62828' }} />
            </Col>
          </Row>

          {/* Contenido */}
          <section style={{ backgroundColor: '#e0e0e0', borderRadius: '10px', padding: '30px' }}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center" style={{ color: '#c62828', fontSize: '2rem' }}>POLÍTICA</Card.Title>
                <p><strong>Nuestra empresa</strong> se compone de un grupo diverso...</p>
                <ul>
                  <li><strong>Cumplir</strong> con la legislación vigente...</li>
                  <li><strong>Eliminar los peligros</strong>...</li>
                  <li><strong>Comprometernos con el medio ambiente</strong>...</li>
                  <li><strong>Mejorar continuamente</strong>...</li>
                </ul>
              </Card.Body>
            </Card>
          </section>

          {/* Formulario de reporte */}
          <section className="mt-5">
            <Card>
              <Card.Header style={{ backgroundColor: '#b32400', color: 'white' }}>
                Reportar una observación
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Escribe tu reporte</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={reporte}
                      onChange={(e) => setReporte(e.target.value)}
                      required
                    />
                  </Form.Group>

                  {/* Selección de categoría */}
                  <Form.Group className="mt-3">
                    <Form.Label>Selecciona la categoría</Form.Label>
                    <Form.Control
                      as="select"
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                    >
                      <option value="consulta">Consulta</option>
                      <option value="participacion">Participación</option>
                      <option value="sugerencia">Sugerencia</option>
                      <option value="queja">Queja</option>
                    </Form.Control>
                  </Form.Group>

                  <Button className="mt-3" variant="danger" type="submit">Enviar Reporte</Button>
                </Form>
                {mensajeEnviado && <Alert variant="success" className="mt-3">¡Reporte enviado correctamente!</Alert>}
              </Card.Body>
            </Card>
          </section>

          {/* Botón de volver */}
          <Row className="justify-content-center mt-4">
            <Col md={4}>
              <Button onClick={handleBack} style={{ width: '100%' }} variant="outline-danger">
                Regresar
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PoliticaPage;
