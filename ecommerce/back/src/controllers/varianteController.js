
import Variante from '../models/Variante.js';

export const getVariantesPorProducto = async (req, res) => {
  const { productoId } = req.params;

  try {
    const variantes = await Variante.findAll({ where: { idProducto: productoId } });
    res.json(variantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener variantes.' });
  }
};
