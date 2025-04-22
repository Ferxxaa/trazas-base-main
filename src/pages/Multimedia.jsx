// src/pages/Multimedia.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Multimedia = () => {
  return (
    <Container className="mt-5"> {/* Añadí mt-5 aquí para un espacio superior */}
      <h2 className="mt-5"></h2> {/* Puedes ajustar este mt-4 si lo prefieres */}
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="/images/trabajador.png" />
            <Card.Body>
              <Card.Title>Imagen 1</Card.Title>
              <Card.Text>
                Descripción de la imagen 1. Aquí puedes agregar información relevante sobre la foto.
              </Card.Text>
              <Button variant="primary">Ver más</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="/images/maquinaria.png" />
            <Card.Body>
              <Card.Title>Imagen 2</Card.Title>
              <Card.Text>
                Descripción de la imagen 2. Aquí puedes agregar información relevante sobre la foto.
              </Card.Text>
              <Button variant="primary">Ver más</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="/images/estructura.png" />
            <Card.Body>
              <Card.Title>Imagen 3</Card.Title>
              <Card.Text>
                Descripción de la imagen 3. Aquí puedes agregar información relevante sobre la foto.
              </Card.Text>
              <Button variant="primary">Ver más</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/400x300" />
            <Card.Body>
              <Card.Title>Imagen 4</Card.Title>
              <Card.Text>
                Descripción de la imagen 4. Aquí puedes agregar información relevante sobre la foto.
              </Card.Text>
              <Button variant="primary">Ver más</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/400x300" />
            <Card.Body>
              <Card.Title>Imagen 5</Card.Title>
              <Card.Text>
                Descripción de la imagen 5. Aquí puedes agregar información relevante sobre la foto.
              </Card.Text>
              <Button variant="primary">Ver más</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/400x300" />
            <Card.Body>
              <Card.Title>Imagen 6</Card.Title>
              <Card.Text>
                Descripción de la imagen 6. Aquí puedes agregar información relevante sobre la foto.
              </Card.Text>
              <Button variant="primary">Ver más</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Multimedia;
