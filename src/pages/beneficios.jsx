import React from 'react';
import { Container, Row, Col, Card, Accordion, Button } from 'react-bootstrap';
import { FaTooth, FaPlane, FaGift, FaHeartbeat, FaShoppingCart } from 'react-icons/fa';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para el botón de regresar

import Navbar from '../components/Navbar';

const beneficios = [
  {
    icon: <FaTooth size={40} color="#007bff" />,
    title: 'Salud Dental',
    description: 'Atención dental de calidad a bajo costo en instituciones afiliadas.',
    image: '/images/dental.jpg',
    extra: (
      <ul style={{ textAlign: 'left', paddingLeft: '1.2rem' }}>
        <li>Diagnóstico y Presupuesto gratis.</li>
        <li>Radiografías de Diagnóstico Bitewing gratis, siempre y cuando se realice tratamiento en Integramédica (Máximo 4 por afiliado).</li>
        <li>Hasta 60% de descuento sobre arancel propio en todas las Prestaciones Dentales.</li>
      </ul>
    )
  },
  {
    icon: <FaHandHoldingUsd size={40} color="#6f42c1" />,
    title: 'Beneficios Financieros',
    description: 'Crédito social para afrontar contingencias con respaldo de Caja Los Andes.',
    image: '/images/financiero.jpg',
    extra: (
        <ul style={{ textAlign: 'left' }}>
          <li>
            Crédito social es un crédito que le permite a nuestros afiliados afrontar contingencias, para que estén disponibles en el momento y lugar que lo necesitan, uno de los pilares que sostiene Caja los Andes para con nuestros afiliados.
          </li>
          <li>
            <strong>Requisitos:</strong>
            <ul>
              <li>Ser mayor de 18 años.</li>
              <li>Cédula de Identidad vigente.</li>
              <li>Ser trabajador de una empresa afiliada a Caja Los Andes.</li>
              <li>Antigüedad laboral mínima de un mes.</li>
              <li>Tener contrato de trabajo (a plazo fijo o indefinido).</li>
              <li>En caso de requerir Aval, este debe ser también trabajador dependiente de alguna empresa afiliada a Caja Los Andes.</li>
              <li>En caso de ser afiliado extranjero, debe contar con residencia definitiva.</li>
            </ul>
          </li>
          <li>
            <strong>Documentación:</strong>
            <ul>
              <li>Última liquidación de sueldo para renta fija y tres últimas liquidaciones de sueldo para renta variable, en original. En caso de requerir Aval, éste también debe presentarlas.</li>
              <li>Comprobante de domicilio particular.</li>
            </ul>
          </li>
        </ul>
      )
    },      
  {
    icon: <FaPlane size={40} color="#17a2b8" />,
    title: 'Descuentos en Viajes y Destinos',
    description: 'Viaja por Chile con importantes descuentos en paquetes turísticos.',
    image: '/images/viaje.jpg',
    extra: (
        <ul style={{ textAlign: 'left' }}>
          <li><strong>¿CÓMO HACER UNA RESERVA?</strong></li>
          <ul>
            <li>Llamando al Call Center: 600 510 0000.</li>
            <li>Llamando directamente al Centro vacacional.</li>
            <li>De manera presencial en cada Centro vacacional o Sucursales.</li>
          </ul>
        </ul>
      )
  },
  {
    icon: <FaGift size={40} color="#ffc107" />,
    title: 'Bonos Familiares',
    description: 'Apoyo económico por eventos importantes en la vida del afiliado.',
    image: '/images/familia.jpg',
    extra: (
        <ul style={{ textAlign: 'left' }}>
          <li>Bono de Natalidad</li>
          <li>Bono de Nupcialidad</li>
          <li>Bono de Acuerdo de Unión Civil</li>
          <li>Bono Fallecimiento Trabajador</li>
          <li>Bono Fallecimiento Cónyuge</li>
          <li>Bono Fallecimiento Carga</li>
        </ul>
      )
  },
  {
    icon: <FaShoppingCart size={40} color="#28a745" />,
    title: 'Descuentos en Compras',
    description: 'Aprovecha descuentos en una amplia red de comercios aliados.',
    image: '/images/Descuentos.png',
    extra: (
        <ul style={{ textAlign: 'left' }}>
          <li>Abastible</li>
          <li>Farmacia Ahumada</li>
          <li>Cruz Verde</li>
          <li>Salcobrand</li>
          <li>Léeme+</li>
          <li>Preunic</li>
          <li>F Facción</li>
        </ul>
      )
  }
];

const Beneficios = () => {
  const navigate = useNavigate(); // Usamos useNavigate de React Router

  const goBack = () => {
    navigate(-1); // Esto lleva al usuario a la página anterior
  };

  return (
    <>
      <Navbar />
      {/* Espacio entre navbar y contenido */}
      <div
        style={{
          backgroundColor: '#e6f0ff',
          padding: '30px 0',
          textAlign: 'center',
          marginTop: '105px'
        }}
      >
        <img
          src="/images/caja.png"
          alt="Caja Los Andes"
          style={{ maxWidth: '180px', marginBottom: '2px' }}
        />
        <h4 style={{ color: '#004d99', marginTop: '10px', fontWeight: 'bold' }}>Accede a:</h4>
      </div>

      {/* Botón de regreso */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Button variant="outline-primary" onClick={goBack}>Regresar</Button>
      </div>

      <Container fluid className="py-5" style={{ fontFamily: "'Roboto', sans-serif", backgroundColor: '#f9f9f9' }}>
        <h2 className="text-center mb-5" style={{ color: '#004d99', fontWeight: 'bold' }}>Nuestros Beneficios</h2>
        <Row className="justify-content-center">
          {beneficios.map((beneficio, index) => (
            <Col key={index} md={4} sm={6} className="d-flex align-items-stretch mb-4">
              <Card className="w-100 shadow-sm" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                <Card.Img variant="top" src={beneficio.image} style={{ height: '180px', objectFit: 'cover' }} />
                <Card.Body className="text-center">
                  <div className="mb-3">{beneficio.icon}</div>
                  <Card.Title style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#333' }}>{beneficio.title}</Card.Title>
                  <Card.Text style={{ fontSize: '1rem', color: '#666' }}>{beneficio.description}</Card.Text>
                  {beneficio.extra && (
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Ver más información</Accordion.Header>
                        <Accordion.Body>{beneficio.extra}</Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Beneficios;
