import React, { useEffect, useState } from "react";
import axios from "axios";
import CardsProductos from "../components/CardsProductos";
import { Box, Typography, Grid } from "@mui/material";


export default function MejorValorado() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchMejorValorados = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/mejor-valorados");
        setProductos(res.data);
      } catch (error) {
        console.error("Error al obtener los productos mejor valorados:", error);
      }
    };

    fetchMejorValorados();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Productos Mejor Valorados
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {productos.map((producto) => (
          <Grid item key={producto.productoId}>
            <CardsProductos
              id={producto.productoId}
              nombre={producto.nombre}
              precio={producto.precio}
              categoria={producto.categoria}
              imagen={producto.imagen}
              oferta={producto.oferta}
              descuento={producto.descuento}
              extraInfo={`Votos de la comunidad: ${producto.cantidadVotos}`}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
