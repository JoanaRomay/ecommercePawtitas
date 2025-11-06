import Carrito from '../models/Carrito.js';

// Obtener todos los carritos
export const getCarritos = async (req, res) => {
  try {
    const carritos = await Carrito.findAll();
    res.json(carritos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los carritos' });
  }
};

// Obtener un carrito por ID
export const getCarritoById = async (req, res) => {
  try {
    const { id } = req.params;
    const carrito = await Carrito.findByPk(id);

    if (!carrito) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

// Crear un nuevo carrito
export const createCarrito = async (req, res) => {
  try {
    const { cantidad, idCliente, idProducto } = req.body;
    const nuevoCarrito = await Carrito.create({ cantidad, idCliente, idProducto });
    res.status(201).json(nuevoCarrito);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el carrito' });
  }
};

// Actualizar un carrito existente
export const updateCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad, idCliente, idProducto } = req.body;
    const carrito = await Carrito.findByPk(id);

    if (!carrito) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    await carrito.update({ cantidad, idCliente, idProducto });
    res.json(carrito);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el carrito' });
  }
};

// Eliminar un carrito
export const deleteCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const carrito = await Carrito.findByPk(id);

    if (!carrito) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    await carrito.destroy();
    res.json({ mensaje: 'Carrito eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el carrito' });
  }
};
