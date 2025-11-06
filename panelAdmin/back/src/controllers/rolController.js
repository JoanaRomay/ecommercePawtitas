// src/controllers/rolController.js
import { Rol } from "../models/index.js";
import { validationResult } from "express-validator";

// Obtener todos los roles
export const getRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.json({ success: true, data: roles });
  } catch (err) {
    console.error("Error en getRoles:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Obtener rol por ID
export const getRolById = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await Rol.findByPk(id);
    if (!rol) return res.status(404).json({ success: false, error: "Rol no encontrado" });
    res.json({ success: true, data: rol });
  } catch (err) {
    console.error("Error en getRolById:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Crear un rol
export const createRol = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, error: "Datos inválidos", details: errors.array() });

    const { codigo, descripcion } = req.body;

    const existente = await Rol.findOne({ where: { codigo } });
    if (existente) return res.status(400).json({ success: false, error: "Ya existe un rol con ese código" });

    const nuevoRol = await Rol.create({ codigo, descripcion });
    res.status(201).json({ success: true, data: nuevoRol, message: "Rol creado exitosamente" });
  } catch (err) {
    console.error("Error en createRol:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Actualizar un rol
export const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, error: "Datos inválidos", details: errors.array() });

    const rol = await Rol.findByPk(id);
    if (!rol) return res.status(404).json({ success: false, error: "Rol no encontrado" });

    await rol.update(req.body);
    res.json({ success: true, data: rol, message: "Rol actualizado exitosamente" });
  } catch (err) {
    console.error("Error en updateRol:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Eliminar un rol
export const deleteRol = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await Rol.findByPk(id);
    if (!rol) return res.status(404).json({ success: false, error: "Rol no encontrado" });

    await rol.destroy();
    res.json({ success: true, message: "Rol eliminado exitosamente" });
  } catch (err) {
    console.error("Error en deleteRol:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};
