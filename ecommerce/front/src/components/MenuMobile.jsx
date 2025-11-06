import * as React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

export default function MenuMobile({
  menuAbierto,
  handleCloseNavMenu,
  pages
}) {
  return (
    <Drawer
      anchor="left"
      open={menuAbierto}
      onClose={handleCloseNavMenu}
      PaperProps={{
        sx: {
          width: 280,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100vh',
          backgroundColor: '#fff',
          p: 2,
        }
      }}
    >
      {/* Contenido principal del menú */}
      <Box sx={{ flexGrow: 1, pt: 5 }}>
        {pages.map(({ nombre, path }) => (
          <Box key={nombre} onClick={handleCloseNavMenu}>
            <Link
              to={path}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: '#13555E',
                padding: '1rem',
                fontSize: '1.2rem',
              }}
            >
              {nombre}
            </Link>
            <Divider />
          </Box>
        ))}
      </Box>

      {/* Botones fijos abajo */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 2 }}>
        <Button
          variant="outlined"
          sx={{ borderColor: '#13555E', color: '#13555E' }}
          onClick={handleCloseNavMenu}
        >
          Crear usuario
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#13555E',
            color: '#fff',
            '&:hover': { backgroundColor: '#0f3f46' },
          }}
          onClick={handleCloseNavMenu}
        >
          Ingresar
        </Button>
      </Box>
    </Drawer>
  );
}
