import Orden from "../models/Orden.js";

// Obtener todas las órdenes
export const getOrdenes = async (req, res) => {
  try {
    const ordenes = await Orden.findAll();
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las órdenes." });
  }
};

// Obtener una orden por ID
export const getOrdenById = async (req, res) => {
  const { id } = req.params;
  try {
    const orden = await Orden.findByPk(id);
    if (!orden) return res.status(404).json({ error: "Orden no encontrada." });
    res.json(orden);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la orden." });
  }
};

// Crear una nueva orden
export const createOrden = async (req, res) => {
  const { total, estado, direccionEnvio, fechaOrden, idCliente } = req.body;
  try {
    const nuevaOrden = await Orden.create({
      total,
      estado,
      direccionEnvio,
      fechaOrden,
      idCliente
    });
    res.status(201).json(nuevaOrden);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la orden." });
  }
};

// Actualizar una orden
export const updateOrden = async (req, res) => {
  const { id } = req.params;
  const { total, estado, direccionEnvio, fechaOrden, idCliente } = req.body;
  try {
    const orden = await Orden.findByPk(id);
    if (!orden) return res.status(404).json({ error: "Orden no encontrada." });

    await orden.update({
      total,
      estado,
      direccionEnvio,
      fechaOrden,
      idCliente
    });

    res.json(orden);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la orden." });
  }
};

// Eliminar una orden
export const deleteOrden = async (req, res) => {
  const { id } = req.params;
  try {
    const orden = await Orden.findByPk(id);
    if (!orden) return res.status(404).json({ error: "Orden no encontrada." });

    await orden.destroy();
    res.json({ message: "Orden eliminada." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la orden." });
  }
};
