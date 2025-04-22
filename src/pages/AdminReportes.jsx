import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { auth } from '../firebase';

const AdminReportes = () => {
  const [reportes, setReportes] = useState([]);
  const navigate = useNavigate();

  // Verificación de rol al cargar el componente
  useEffect(() => {
    const user = auth.currentUser;

    const adminUID = 'OPzraOsNQ5YXrEBNSPGOMSTpGJJ3'; // UID del admin

    if (!user || user.uid !== adminUID) {
      alert('Acceso denegado. Solo los administradores pueden ver esta sección.');
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem('reportes')) || [];
    setReportes(datos);
  }, []);

  const eliminarReporte = (id) => {
    const nuevosReportes = reportes.filter((r) => r.id !== id);
    setReportes(nuevosReportes);
    localStorage.setItem('reportes', JSON.stringify(nuevosReportes));
  };

  return (
    <>
      <Navbar />
      <Container style={{ paddingTop: '50px' }}>
        <h2 className="text-center mb-4" style={{ fontSize: '1.8rem', color: '#333' }}>
          Administración de Reportes
        </h2>

        <Card className="shadow-sm rounded">
          <Card.Body>
            {reportes.length === 0 ? (
              <p className="text-center">No hay reportes registrados.</p>
            ) : (
              <div className="table-responsive">
                <Table striped bordered hover size="sm" className="table-sm">
                  <thead className="thead-dark">
                    <tr>
                      <th>ID</th>
                      <th>Reporte</th>
                      <th>Categoría</th>
                      <th>Fecha</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportes.map((reporte) => (
                      <tr key={reporte.id}>
                        <td>{reporte.id}</td>
                        <td>{reporte.texto}</td>
                        <td>{reporte.categoria}</td>
                        <td>{reporte.fecha}</td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => eliminarReporte(reporte.id)}
                            className="d-flex justify-content-center"
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AdminReportes;
