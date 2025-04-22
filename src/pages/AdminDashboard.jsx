import React, { useState, useEffect } from 'react';
import {
  Typography, Grid, Paper, Container, Box, CircularProgress, Button
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

// Importación del Navbar
import Navbar from '../components/Navbar';

// Importar Firebase
import { db, auth } from '../firebase';
import { ref, get, remove } from 'firebase/database';

const ITALIAN_RED = '#C62B27';  
const LIGHT_GRAY = '#F4F6F9';  

const Dashboard = () => {
  const navigate = useNavigate();

  const [usuariosTotales, setUsuariosTotales] = useState(0);
  const [usuariosPorDia, setUsuariosPorDia] = useState([]);
  const [graficoUsuarios, setGraficoUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Variable para verificar si el usuario es admin

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/login');
      return;
    }

    const usuariosRef = ref(db, 'usuarios');
    get(usuariosRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usuarios = snapshot.val();
          const usuariosArray = Object.values(usuarios);
          setUsuariosTotales(usuariosArray.length);

          const currentUser = usuariosArray.find(user => user.id === auth.currentUser.uid);
          if (currentUser && currentUser.role === 'admin') {
            setIsAdmin(true);
          }

          const usuariosPorDiaData = usuariosArray.reduce((acc, user) => {
            const fecha = user.fechaRegistro;
            acc[fecha] = (acc[fecha] || 0) + 1;
            return acc;
          }, {});

          const usuariosPorDiaArray = Object.keys(usuariosPorDiaData).map((fecha) => ({
            name: fecha,
            value: usuariosPorDiaData[fecha],
          }));

          setUsuariosPorDia(usuariosPorDiaArray);

          const usuariosParaTabla = usuariosArray.map((user) => ({
            id: user.id,
            name: user.nombre || 'Sin nombre',
            apellido: user.apellido || 'Sin apellido',
            correo: user.correo || 'No disponible',
          }));
          setGraficoUsuarios(usuariosParaTabla);
        }
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  const handleDeleteUser = (userId) => {
    if (!isAdmin) {
      alert("No tienes permisos para eliminar usuarios");
      return;
    }

    remove(ref(db, `usuarios/${userId}`))
      .then(() => {
        console.log('Usuario eliminado');
        const usuariosRef = ref(db, 'usuarios');
        get(usuariosRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const usuarios = snapshot.val();
              const usuariosArray = Object.values(usuarios);
              setUsuariosTotales(usuariosArray.length);
            }
          })
          .catch((error) => console.error('Error al obtener los datos:', error));
      })
      .catch((error) => console.error('Error al eliminar usuario:', error));
  };

  const theme = createTheme({
    palette: {
      primary: { main: ITALIAN_RED },
    },
    typography: {
      h5: { fontWeight: 500, fontSize: 22 },
    },
    shape: { borderRadius: 8 },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <CssBaseline />
        <Navbar />
        <Box component="main" sx={{ flex: 1, py: 4, px: 2, bgcolor: LIGHT_GRAY, pt: 10 }}>
          <Container maxWidth="lg">
            <Grid container spacing={2} sx={{ flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
              
              {/* Caja de usuarios registrados */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'white', boxShadow: 3 }}>
                  <Typography variant="h6" color="textSecondary">Usuarios Registrados</Typography>
                  <Typography variant="h4" color="primary">
                    {loading ? <CircularProgress size={24} /> : usuariosTotales}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/crear-usuario')}
                    sx={{ mt: 2, width: '100%' }}
                  >
                    Agregar Usuario
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate('/admin-reportes')}
                    sx={{ mt: 1, width: '100%' }}
                  >
                    Ver Reportes
                  </Button>
                </Paper>
              </Grid>

              {/* Gráfico de usuarios por día */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, bgcolor: 'white', boxShadow: 3 }}>
                  <Typography variant="h6" gutterBottom color="textSecondary">
                    Usuarios por Día
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={usuariosPorDia}>
                      <Line type="monotone" dataKey="value" stroke={ITALIAN_RED} />
                      <CartesianGrid stroke="#ccc" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              {/* Lista de usuarios */}
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Paper sx={{ p: 2, bgcolor: 'white', boxShadow: 3 }}>
                  <Typography variant="h6" gutterBottom color="textSecondary">
                    Lista de Usuarios
                  </Typography>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>ID</th>
                          <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Nombre</th>
                          <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Apellido</th>
                          <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Correo</th>
                          <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {graficoUsuarios.map((user, index) => (
                          <tr key={index}>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{user.id}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{user.name}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{user.apellido}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{user.correo}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                              {isAdmin && (
                                <Button color="primary" onClick={() => handleDeleteUser(user.id)}>
                                  Eliminar
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
