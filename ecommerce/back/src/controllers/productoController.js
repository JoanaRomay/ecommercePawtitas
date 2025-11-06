// controllers/productoController.js
import Producto from "../models/Producto.js";

// Obtener todos los productos
export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      where: {
        estado: 1 // Solo productos activos
      }
    });
    console.log("Productos activos encontrados:", productos.length);
    res.json(productos);
  } catch (error) {
    console.error("Error en getProductos:", error);
    res.status(500).json({ error: "Error al obtener los productos." });
  }
};


// Obtener un producto por ID
export const getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado." });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto." });
  }
};

// Obtener productos destacados
export const getProductosDestacados = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      where: {
        estado: 1,        // Solo activos
        destacado: true,  // Solo los destacados
      },
    });
    console.log("Productos destacados encontrados:", productos.length);
    res.json(productos);
  } catch (error) {
    console.error("Error en getProductosDestacados:", error);
    res.status(500).json({ error: "Error al obtener los productos destacados." });
  }
};
