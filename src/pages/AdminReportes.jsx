import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // 👈 Importa el hook para redireccionar
import Navbar from '../components/Navbar';
import { auth } from '../firebase'; // Asegúrate de importar Firebase

const AdminReportes = () => {
  const [reportes, setReportes] = useState([]);
  const navigate = useNavigate(); // 👈 Inicializa useNavigate

  // Verificación de rol al cargar el componente
  useEffect(() => {
    const user = auth.currentUser; // Obtener el usuario actual desde Firebase

    const adminUID = 'OPzraOsNQ5YXrEBNSPGOMSTpGJJ3'; // UID del admin

    if (!user || user.uid !== adminUID) {
      alert('Acceso denegado. Solo los administradores pueden ver esta sección.');
      navigate('/'); // Redirecciona a inicio u otra ruta si no es el admin
    }
  }, [navigate]); // 👈 Dependencia para recargar en caso de que el usuario cambie

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
      <Container style={{ paddingTop: '100px' }}>
        <h2 className="text-center mb-4">Administración de Reportes</h2>

        <Card>
          <Card.Body>
            {reportes.length === 0 ? (
              <p>No hay reportes registrados.</p>
            ) : (
              <div className="table-responsive">
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Reporte</th>
                      <th>Categoría</th> {/* Nueva columna de categoría */}
                      <th>Fecha</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportes.map((reporte) => (
                      <tr key={reporte.id}>
                        <td>{reporte.id}</td>
                        <td>{reporte.texto}</td>
                        <td>{reporte.categoria}</td> {/* Mostrar categoría */}
                        <td>{reporte.fecha}</td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => eliminarReporte(reporte.id)}
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
