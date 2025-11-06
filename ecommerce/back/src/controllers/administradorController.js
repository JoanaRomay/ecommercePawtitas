import Administrador from '../models/Administrador.js';

// Obtener todos los administradores
export const getAdministradores = async (req, res) => {
  try {
    const admins = await Administrador.findAll();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los administradores.' });
  }
};

// Obtener administrador por ID
export const getAdministradorById = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Administrador.findByPk(id);
    if (!admin) return res.status(404).json({ error: 'Administrador no encontrado.' });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el administrador.' });
  }
};

// Crear nuevo administrador
export const createAdministrador = async (req, res) => {
  const { nombre, email, contraseña, fechaRegistro } = req.body;
  try {
    const existente = await Administrador.findOne({ where: { email } });
    if (existente) return res.status(400).json({ error: 'El email ya está registrado.' });

    const nuevoAdmin = await Administrador.create({
      nombre,
      email,
      contraseña,
      fechaRegistro
    });
    res.status(201).json(nuevoAdmin);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el administrador.' });
  }
};

// Actualizar administrador
export const updateAdministrador = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, contraseña, fechaRegistro } = req.body;

  try {
    const admin = await Administrador.findByPk(id);
    if (!admin) return res.status(404).json({ error: 'Administrador no encontrado.' });

    if (email && email !== admin.email) {
      const existente = await Administrador.findOne({ where: { email } });
      if (existente) return res.status(400).json({ error: 'Ese email ya está en uso.' });
    }

    await admin.update({
      nombre: nombre ?? admin.nombre,
      email: email ?? admin.email,
      contraseña: contraseña ?? admin.contraseña,
      fechaRegistro: fechaRegistro ?? admin.fechaRegistro
    });

    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el administrador.' });
  }
};

// Eliminar administrador
export const deleteAdministrador = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Administrador.findByPk(id);
    if (!admin) return res.status(404).json({ error: 'Administrador no encontrado.' });

    await admin.destroy();
    res.json({ mensaje: 'Administrador eliminado con éxito.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el administrador.' });
  }
};
