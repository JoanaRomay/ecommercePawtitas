import DetalleOrden from "../models/DetalleOrden.js";

// Obtener todos los detalles de orden
export const getDetalleOrden = async (req, res) => {
  try {
    const detalles = await DetalleOrden.findAll();
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los detalles de orden." });
  }
};

// Obtener un detalle de orden por ID
export const getDetalleOrdenById = async (req, res) => {
  const { id } = req.params;
  try {
    const detalle = await DetalleOrden.findByPk(id);
    if (!detalle) return res.status(404).json({ error: "Detalle de orden no encontrado." });
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el detalle de orden." });
  }
};

// Crear un nuevo detalle de orden
export const createDetalleOrden = async (req, res) => {
  const { cantidad, precioUnitario, subTotal, idOrden, idProducto } = req.body;
  try {
    const nuevoDetalle = await DetalleOrden.create({
      cantidad,
      precioUnitario,
      subTotal,
      idOrden,
      idProducto
    });
    res.status(201).json(nuevoDetalle);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el detalle de orden." });
  }
};

// Actualizar un detalle de orden
export const updateDetalleOrden = async (req, res) => {
  const { id } = req.params;
  const { cantidad, precioUnitario, subTotal, idOrden, idProducto } = req.body;
  try {
    const detalle = await DetalleOrden.findByPk(id);
    if (!detalle) return res.status(404).json({ error: "Detalle de orden no encontrado." });

    await detalle.update({ cantidad, precioUnitario, subTotal, idOrden, idProducto });
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el detalle de orden." });
  }
};

// Eliminar un detalle de orden
export const deleteDetalleOrden = async (req, res) => {
  const { id } = req.params;
  try {
    const detalle = await DetalleOrden.findByPk(id);
    if (!detalle) return res.status(404).json({ error: "Detalle de orden no encontrado." });

    await detalle.destroy();
    res.json({ message: "Detalle de orden eliminado." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el detalle de orden." });
  }
};
