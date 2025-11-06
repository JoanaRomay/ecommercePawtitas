// services/productoServiceEcommerce.js
import API from './api.js';

const productoServiceEcommerce = {
  obtenerProductos: async () => {
    try {
      const res = await API.get('/productos'); // Trae todos los productos del back
      const productos = Array.isArray(res.data) ? res.data : [];

      // Procesar cada producto: asegurar que imgUrl sea un array
      const productosProcesados = productos.map(p => {
        const imgs = Array.isArray(p.imgUrl) 
          ? p.imgUrl 
          : p.imgUrl 
            ? [p.imgUrl] 
            : [];
        return {
          ...p,
          imgUrl: imgs,
          tipoMascota: p.tipoMascota || '',
          descuento: p.descuento || 0,
        };
      });

      return productosProcesados;
    } catch (error) {
      console.error(
        "Error obteniendo productos del ecommerce:",
        error.response?.data || error.message
      );
      return [];
    }
  },

  // Obtener productos destacados
  obtenerProductosDestacados: async () => {
    try {
      const res = await API.get('/productos/destacados');
      const productos = Array.isArray(res.data) ? res.data : [];

      const productosProcesados = productos.map(p => {
        const imgs = Array.isArray(p.imgUrl) 
          ? p.imgUrl 
          : p.imgUrl 
            ? [p.imgUrl] 
            : [];
        return {
          ...p,
          imgUrl: imgs,
          tipoMascota: p.tipoMascota || '',
          descuento: p.descuento || 0,
        };
      });

      return productosProcesados;
    } catch (error) {
      console.error(
        "Error obteniendo productos destacados del ecommerce:",
        error.response?.data || error.message
      );
      return [];
    }
  },
};

export default productoServiceEcommerce;
