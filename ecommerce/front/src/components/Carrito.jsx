import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';

export default function Carrito({ open, onClose, carrito = [], onActualizarCantidad, onEliminarProducto }) {
  const total = carrito.reduce((acc, item) => {
    const precioNum = Number(item.precio) || 0;
    const descuentoNum = Number(item.descuento) || 0;
    const precioFinal = descuentoNum > 0 ? precioNum * (1 - descuentoNum / 100) : precioNum;
    return acc + precioFinal * item.cantidad;
  }, 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 2, position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8, color: 'gray' }}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" sx={{ mb: 3, mt: 1 }}>Tu Carrito</Typography>

        {carrito.length === 0 ? (
          <Typography sx={{ mt: 3 }}>No hay productos en el carrito.</Typography>
        ) : (
          <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {carrito.map((item) => {
              const imagenURL = item.imagen
                ? Array.isArray(item.imagen)
                  ? item.imagen[0] || '/placeholder.webp'
                  : item.imagen
                : '/placeholder.webp';
              const imagenFinal = imagenURL.startsWith('http') ? imagenURL : `http://localhost:3000${imagenURL}`;

              const precioNum = Number(item.precio) || 0;
              const descuentoNum = Number(item.descuento) || 0;
              const precioFinal = descuentoNum > 0 ? precioNum * (1 - descuentoNum / 100) : precioNum;

              return (
                <React.Fragment key={item.id}>
                  <ListItem alignItems="flex-start" sx={{ display: 'flex', gap: 2, bgcolor: '#f9f9f9', borderRadius: 2, p: 1, mb: 1 }}>
                    <Box component="img" src={imagenFinal} alt={item.nombre} sx={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 1, border: '1px solid #ddd' }} />

                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{item.nombre}</Typography>
                      <Typography variant="body2" color="green" sx={{ fontWeight: 500 }}>${precioFinal.toFixed(2)}</Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <IconButton size="small" onClick={() => onActualizarCantidad(item.id, item.cantidad - 1)}><RemoveIcon fontSize="small" /></IconButton>
                        <Typography sx={{ mx: 1 }}>{item.cantidad}</Typography>
                        <IconButton size="small" onClick={() => onActualizarCantidad(item.id, item.cantidad + 1)}><AddIcon fontSize="small" /></IconButton>
                      </Box>
                    </Box>

                    <IconButton onClick={() => onEliminarProducto(item.id)}><DeleteIcon sx={{ color: 'gray' }} /></IconButton>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
          </List>
        )}

        {carrito.length > 0 && (
          <Box sx={{ mt: 2, borderTop: '1px solid #ddd', pt: 2 }}>
            <Typography variant="h6" sx={{ textAlign: 'right', mb: 1 }}>Total: ${total.toFixed(2)}</Typography>
            <Button fullWidth variant="contained" sx={{ textTransform: 'none', bgcolor: '#4ECDC4', '&:hover': { bgcolor: '#45b8b0' } }}>Finalizar compra</Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
