import CarritoXProducto from '../models/CarritoXProducto.js';
import Producto from '../models/Producto.js';

export const getProductosByCarrito = async (req, res) => {
  const { idCarrito } = req.params;
  try {
    const items = await CarritoXProducto.findAll({
      where: { idCarrito },
      include: [{ model: Producto }] 
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos del carrito' });
  }
};
// Agregar producto al carrito
export const addProductoToCarrito = async (req, res) => {
  const { idCarrito, idProducto, cantidad } = req.body;
  try {
    const nuevoItem = await CarritoXProducto.create({
      idCarrito,
      idProducto,
      cantidad
    });
    res.status(201).json(nuevoItem);
  } catch (error) {
    console.error('Error en addProductoToCarrito:', error);
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
};

// Actualizar cantidad de producto en carrito
export const updateCantidad = async (req, res) => {
  const { id } = req.params; // 
  const { cantidad } = req.body;
  try {
    const item = await CarritoXProducto.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Item no encontrado' });

    item.cantidad = cantidad;
    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cantidad' });
  }
};

// Eliminar producto del carrito
export const deleteProductoFromCarrito = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await CarritoXProducto.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Item no encontrado' });

    await item.destroy();
    res.json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto del carrito' });
  }
};
