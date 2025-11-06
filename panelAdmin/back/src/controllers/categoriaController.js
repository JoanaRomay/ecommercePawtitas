import { Categoria, Producto } from "../models/index.js";
import { Op, Sequelize } from "sequelize";
import { validationResult } from "express-validator";

// Obtener todas las categorías
export const getCategorias = async (req, res) => {
  try {
    const { page = 1, limit = 10, activa, search, sort = "id", direction = "DESC" } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};

    if (activa !== undefined && activa !== "all") {
      whereClause.activa = activa === "true";
    }

    // Filtrar por letra inicial del nombre
    if (search) {
      const likeSearch = `${search.toLowerCase()}%`;
      whereClause.nombre = Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("Categoria.nombre")),
        { [Op.like]: likeSearch }
      );
    }

    const categorias = await Categoria.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort, direction.toUpperCase()]],
    });

    res.json({
      success: true,
      data: categorias.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(categorias.count / limit),
        totalItems: categorias.count,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (err) {
    console.error("Error en getCategorias:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};


// Obtener categoría por ID
export const getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) return res.status(400).json({ success: false, error: "ID inválido" });

    const categoria = await Categoria.findByPk(id);
    if (!categoria) return res.status(404).json({ success: false, error: "Categoría no encontrada" });

    res.json({ success: true, data: categoria });
  } catch (err) {
    console.error("Error en getCategoriaById:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Crear categoría
export const createCategoria = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, error: "Datos inválidos", details: errors.array() });

    const { nombre, descripcion, imagenUrl, activa } = req.body;

    const existente = await Categoria.findOne({ where: { nombre } });
    if (existente) return res.status(400).json({ success: false, error: "Ya existe una categoría con ese nombre" });

    const nuevaCategoria = await Categoria.create({
      nombre,
      descripcion,
      imagenUrl,
      activa: activa !== undefined ? Boolean(activa) : true
    });

    res.status(201).json({ success: true, data: nuevaCategoria, message: "Categoría creada exitosamente" });
  } catch (err) {
    console.error("Error en createCategoria:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Actualizar categoría
export const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, error: "Datos inválidos", details: errors.array() });

    const categoria = await Categoria.findByPk(id);
    if (!categoria) return res.status(404).json({ success: false, error: "Categoría no encontrada" });

    await categoria.update(req.body);
    res.json({ success: true, data: categoria, message: "Categoría actualizada exitosamente" });
  } catch (err) {
    console.error("Error en updateCategoria:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};


// Obtener productos por categoría
export const getProductosByCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const categoria = await Categoria.findByPk(id);
    if (!categoria) return res.status(404).json({ success: false, error: "Categoría no encontrada" });

    const productos = await Producto.findAndCountAll({
      where: { idCategoria: id },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["fechaCreacion", "DESC"]]
    });

    res.json({
      success: true,
      data: productos.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(productos.count / limit),
        totalItems: productos.count,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (err) {
    console.error("Error en getProductosByCategoria:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};


// Desactivar categoría (soft delete)
export const softDeleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);
    if (!categoria) return res.status(404).json({ success: false, error: "Categoría no encontrada" });

    categoria.activa = false;
    await categoria.save();

    res.json({ success: true, message: "Categoría desactivada correctamente" });
  } catch (err) {
    console.error("Error en softDeleteCategoria:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Restaurar categoría
export const restoreCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);
    if (!categoria) return res.status(404).json({ success: false, error: "Categoría no encontrada" });

    categoria.activa = true;
    await categoria.save();

    res.json({ success: true, message: "Categoría restaurada correctamente" });
  } catch (err) {
    console.error("Error en restoreCategoria:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};
