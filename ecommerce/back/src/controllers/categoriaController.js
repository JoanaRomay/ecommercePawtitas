import Categoria from "../models/Categoria.js";

// Obtener todas las categorías activas
export const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      where: { activa: true }
    });
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener categorías." });
  }
};

// Obtener una categoría por ID
export const getCategoriaById = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) return res.status(404).json({ error: "Categoría no encontrada." });
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la categoría." });
  }
};

// Crear una nueva categoría
export const createCategoria = async (req, res) => {
  const { nombre, descripcion, imagenUrl, activa } = req.body;
  try {
    // Validar nombre único
    const existente = await Categoria.findOne({ where: { nombre } });
    if (existente) return res.status(400).json({ error: "Ya existe una categoría con ese nombre." });

    // Validar campo activa correctamente (también si viene como string "false")
    const activaValue = String(activa).toLowerCase() === 'false' ? false : true;

    const nuevaCategoria = await Categoria.create({
      nombre,
      descripcion,
      imagenUrl,
      activa: activaValue
    });

    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la categoría." });
  }
};

// Actualizar una categoría
export const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, imagenUrl, activa } = req.body;

  try {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) return res.status(404).json({ error: "Categoría no encontrada." });

    // Validar que no se duplique nombre (si cambia)
    if (nombre && nombre !== categoria.nombre) {
      const existente = await Categoria.findOne({ where: { nombre } });
      if (existente) return res.status(400).json({ error: "Ya existe una categoría con ese nombre." });
    }

    const activaValue = typeof activa === 'boolean' ? activa : categoria.activa;

    await categoria.update({
      nombre,
      descripcion,
      imagenUrl,
      activa: activaValue
    });

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la categoría." });
  }
};

// Desactivar una categoría (soft delete)
export const deleteCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) return res.status(404).json({ error: "Categoría no encontrada." });

    await categoria.update({ activa: false }); // Soft delete
    res.json({ message: "Categoría desactivada." });
  } catch (error) {
    res.status(500).json({ error: "Error al desactivar la categoría." });
  }
};
