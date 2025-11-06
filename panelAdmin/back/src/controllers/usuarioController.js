// usuarioController.js
import { Usuario, Rol } from "../models/index.js";
import { Op, Sequelize  } from "sequelize";
import bcrypt from "bcryptjs";

// Al inicio del archivo, después de los imports
const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};



/* ==========================
   🧍 Obtener TODOS los usuarios
========================== */
export const getUsuarios = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};

    if (search.trim()) {
      whereClause[Op.or] = [
        Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("Usuario.nombre")),
          { [Op.like]: `${search.toLowerCase()}%` }
        ),
        Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("Usuario.email")),
          { [Op.like]: `${search.toLowerCase()}%` }
        ),
      ];
    }

    const usuarios = await Usuario.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{ model: Rol, as: "rol", attributes: ["codigo", "descripcion"] }],
      order: [["id", "DESC"]],
    });

    res.json({
      success: true,
      data: usuarios.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(usuarios.count / limit),
        totalItems: usuarios.count,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (err) {
    console.error("❌ Error en getUsuarios:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ==========================
   👑 Obtener ADMINISTRADORES
========================== */
export const getAdministradores = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { rolId: { [Op.in]: [1, 3] } };

    if (search.trim()) {
      whereClause[Op.and] = [
        {
          [Op.or]: [
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("Usuario.nombre")),
              { [Op.like]: `${search.toLowerCase()}%` }
            ),
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("Usuario.email")),
              { [Op.like]: `${search.toLowerCase()}%` }
            ),
          ],
        },
      ];
    }

    const administradores = await Usuario.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{ model: Rol, as: "rol", attributes: ["codigo", "descripcion"] }],
      order: [["id", "DESC"]],
    });

    res.json({
      success: true,
      data: administradores.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(administradores.count / limit),
        totalItems: administradores.count,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (err) {
    console.error("❌ Error en getAdministradores:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ==========================
   👥 Obtener CLIENTES
========================== */
export const getClientes = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { rolId: 2 };

    if (search.trim()) {
      whereClause[Op.and] = [
        {
          [Op.or]: [
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("Usuario.nombre")),
              { [Op.like]: `${search.toLowerCase()}%` }
            ),
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("Usuario.email")),
              { [Op.like]: `${search.toLowerCase()}%` }
            ),
          ],
        },
      ];
    }

    const clientes = await Usuario.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{ model: Rol, as: "rol", attributes: ["codigo", "descripcion"] }],
      order: [["id", "DESC"]],
    });

    res.json({
      success: true,
      data: clientes.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(clientes.count / limit),
        totalItems: clientes.count,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (err) {
    console.error("❌ Error en getClientes:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


// ==========================
// Obtener usuario por ID
// ==========================
export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) 
      return res.status(400).json({ success: false, error: "ID inválido" });

    const usuario = await Usuario.findByPk(id, {
      include: [{ model: Rol, as: "rol", attributes: ["codigo", "descripcion"] }],
    });

    if (!usuario) 
      return res.status(404).json({ success: false, error: "Usuario no encontrado" });

    res.json({ success: true, data: usuario });
  } catch (err) {
    console.error("Error en getUsuarioById:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// ==========================
// Crear usuario
// ==========================
export const createUsuario = async (req, res) => {
  try {
    const { nombre , email, password, rolId } = req.body;

    // ✅ Validar email único
    const existing = await Usuario.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ success: false, error: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombre: capitalizeFirstLetter(nombre),
      email,
      password: hashedPassword,
      rolId,
    });

    res.status(201).json({ success: true, data: usuario });
  } catch (err) {
    console.error("Error en createUsuario:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


// ==========================
// Actualizar usuario
// ==========================
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, password, rolId } = req.body;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ success: false, error: "Usuario no encontrado" });

    // ✅ Validar email único (excepto para el mismo usuario)
    const existing = await Usuario.findOne({ where: { email, id: { [Op.ne]: id } } });
    if (existing) {
      return res.status(400).json({ success: false, error: "El email ya está registrado" });
    }

    await usuario.update({
       nombre: nombre ? capitalizeFirstLetter(nombre) : usuario.nombre,
      email: email ?? usuario.email,
      password: password ? await bcrypt.hash(password, 10) : usuario.password,
      rolId: rolId ?? usuario.rolId,
    });

    res.json({ success: true, data: usuario });
  } catch (err) {
    console.error("Error en updateUsuario:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};


// ==========================
// Eliminar usuario
// ==========================
export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ success: false, error: "Usuario no encontrado" });

    await usuario.destroy();
    res.json({ success: true, message: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error("Error en deleteUsuario:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// ==========================
// Desactivar usuario (Soft Delete)
// ==========================
export const softDeleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ success: false, error: "Usuario no encontrado" });

    await usuario.update({ activo: false });
    res.json({ success: true, message: "Usuario desactivado correctamente" });
  } catch (err) {
    console.error("Error en softDeleteUsuario:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// ==========================
// Restaurar usuario
// ==========================
export const restoreUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ success: false, error: "Usuario no encontrado" });

    await usuario.update({ activo: true });
    res.json({ success: true, message: "Usuario restaurado correctamente" });
  } catch (err) {
    console.error("Error en restoreUsuario:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};
