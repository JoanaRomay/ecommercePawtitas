import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import MenuMobile from './MenuMobile';
import Carrito from './Carrito';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useLocation } from 'react-router-dom';

const pages = [
  { nombre: 'Inicio', path: '/' },
  { nombre: 'Productos', path: '/productos' },
  { nombre: 'Contacto', path: '/contacto' },
  { nombre: 'Nosotros', path: '/nosotros' },
];

function NavBar() {
  const [menuAbierto, setMenuAbierto] = React.useState(false);
  const [carritoAbierto, setCarritoAbierto] = React.useState(false);
  const [carrito, setCarrito] = React.useState(() => {
    const guardado = localStorage.getItem('carrito');
    return guardado ? JSON.parse(guardado) : [];
  })
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const [cliente, setCliente] = React.useState(() => {
    const saved = localStorage.getItem("cliente");
    return saved ? JSON.parse(saved) : null;
  });
 const location = useLocation();

    
    React.useEffect(() => {
  const actualizarCarrito = () => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado); // esto fuerza re-render y actualiza badge
  };

  window.addEventListener('storage', actualizarCarrito);
  return () => window.removeEventListener('storage', actualizarCarrito);
}, []);

// Escuchar evento personalizado 'agregar-carrito'
React.useEffect(() => {
  const handleAgregar = (e) => {
    const producto = e.detail;
    setCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id);
      if (existe) {
        return prev.map(p => p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p);
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  window.addEventListener('agregar-carrito', handleAgregar);
  return () => window.removeEventListener('agregar-carrito', handleAgregar);
}, []);

// Guardar carrito actualizado en localStorage
React.useEffect(() => {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}, [carrito]);
  // Actualiza cliente en tiempo real al iniciar/cerrar sesión
  React.useEffect(() => {
    const actualizarCliente = () => {
      const saved = localStorage.getItem("cliente");
      setCliente(saved ? JSON.parse(saved) : null);
    };
    window.addEventListener("storage", actualizarCliente);
    return () => window.removeEventListener("storage", actualizarCliente);
  }, []);

  React.useEffect(() => {
    const handleAgregar = (e) => agregarAlCarrito(e.detail);
    window.addEventListener('agregar-carrito', handleAgregar);
    return () => window.removeEventListener('agregar-carrito', handleAgregar);
  }, []);

  React.useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const handleActualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      setCarrito((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCarrito((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, cantidad: nuevaCantidad } : item
        )
      );
    }
  };

  const handleEliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('cliente');
    setCliente(null);
    setAnchorElUser(null);
    navigate('/');
  };
 React.useEffect(() => {
  const actualizarCliente = () => {
    const saved = localStorage.getItem("cliente");
    setCliente(saved ? JSON.parse(saved) : null);
  };
 
  // Escucha un evento personalizado
  window.addEventListener("cliente-cambiado", actualizarCliente);

  return () => window.removeEventListener("cliente-cambiado", actualizarCliente);
 }, []);
    React.useEffect(() => {
  const handleAgregar = (e) => agregarAlCarrito(e.detail);
  window.addEventListener("agregar-carrito", handleAgregar);
  return () => window.removeEventListener("agregar-carrito", handleAgregar);
}, []);


  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#fff', padding: '15px 0' }} elevation={0}>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: { xs: 3, md: 5 } }}>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', position: 'relative', zIndex: 1301 }}>
            <IconButton
              size="large"
              aria-label="toggle menu"
              onClick={() => setMenuAbierto(!menuAbierto)}
              sx={{ color: '#13555E' }}
            >
              {menuAbierto ? <CloseIcon sx={{ fontSize: '2rem' }} /> : <MenuIcon sx={{ fontSize: '2rem' }} />}
            </IconButton>
          </Box>

          <MenuMobile
            menuAbierto={menuAbierto}
            handleCloseNavMenu={() => setMenuAbierto(false)}
            pages={pages}
          />

          <Box
            component="img"
            src="/img/logo/logo.png"
            alt="Logo pawtitas"
            sx={{ width: { xs: '120px', md: '110px' }, cursor: 'pointer' }}
            onClick={() => window.location.href = '/'}
          />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
         {pages.map(({ nombre, path }) => (
  <Button
    key={nombre}
    component={Link}
    to={path}
    onClick={() => setMenuAbierto(false)}
    sx={{
      my: 2,
      color: '#13555E',
      borderBottom: location.pathname === path ? '2px solid #13555E' : '2px solid transparent',
      fontWeight: location.pathname === path ? 'bold' : 'normal',
      transition: 'all 0.3s ease', // <- transición suave
    }}
  >
    {nombre}
  </Button>
))}

            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pr: 2 }}>
            {cliente ? (
              <>
                <IconButton
                  onClick={(e) => setAnchorElUser(e.currentTarget)}
                  sx={{ color: '#13555E', display: { xs: 'none', md: 'flex',  } }}
                >
                  <Box
                    sx={{
                      width: 35,
                      height: 35,
                      borderRadius: '50%',
                      backgroundColor: '#13555E',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                    }}
                  >
                    {cliente.cliente.nombre[0].toUpperCase()}
                  </Box>
                </IconButton>

                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={() => setAnchorElUser(null)}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                   PaperProps={{
                        sx: {
                            width: 200,        // ancho
                            minWidth: 150,     // ancho mínimo
                            maxWidth: 250,     // ancho máximo
                            bgcolor: '#f5f5f5',// fondo
                            borderRadius: 2,   // bordes redondeados
                            p: 1,
                            mt: -1, 
                            ml: -2.5,                    
                        },
  }}
                >
                  <MenuItem onClick={() => { navigate('/perfil'); setAnchorElUser(null); }}>
                    Editar Perfil
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Cerrar Sesión
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Link to="/login-cliente">
                <IconButton sx={{ color: '#13555E', display: { xs: 'none', md: 'flex' } }}>
                  <AccountCircleIcon sx={{ fontSize: '1.7rem' }} />
                </IconButton>
              </Link>
            )}

            <Tooltip title="Abrir carrito">
              <IconButton sx={{ color: '#13555E' }} onClick={() => setCarritoAbierto(true)}>
                <Badge badgeContent={carrito.reduce((acc, item) => acc + item.cantidad, 0)} color="error">
                  <ShoppingCartIcon sx={{ fontSize: '1.7rem' }} />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>

        </Toolbar>
      </AppBar>

      <Carrito
        open={carritoAbierto}
        onClose={() => setCarritoAbierto(false)}
        carrito={carrito}
        onActualizarCantidad={handleActualizarCantidad}
        onEliminarProducto={handleEliminarProducto}
      />
    </>
  );
}

export default NavBar;
