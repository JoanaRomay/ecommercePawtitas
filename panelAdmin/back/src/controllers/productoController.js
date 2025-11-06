import { Producto, Categoria } from "../models/index.js";
import { Op, Sequelize } from "sequelize";
import { validationResult } from "express-validator";


const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getProductos = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, categoriaId } = req.query;
    const offset = (page - 1) * limit;

    const where = {};

    if (search) {
      where[Op.and] = [
        Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("Producto.nombre")),
          { [Op.like]: `${search.toLowerCase()}%` }
        )
      ];
    }

    if (categoriaId) {
      where.idCategoria = categoriaId;
    }

    const productos = await Producto.findAndCountAll({
      where,
      include: [
        {
          model: Categoria,
          as: "categoria",
          attributes: ["id", "nombre"], // solo campos de categoría
        },
      ],
      attributes: [
        "id",
        "nombre",
        "descripcion",
        "precio",
        "stock",
        "imgUrl",
        "tipoMascota",
        "oferta",
        "descuento",
        "estado",
        "fechaCreacion",
        "idCategoria"
      ], // explícitamente traemos imgUrl y todo lo demás
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["id", "DESC"]],
    });

    res.json({
      success: true,
      data: productos.rows,
      total: productos.count,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener productos",
      error: error.message,
    });
  }
};



// Obtener producto por ID con su categoría
export const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) return res.status(400).json({ success: false, error: "ID inválido" });

    const producto = await Producto.findByPk(id, {
      include: [{ model: Categoria, as: "categoria", attributes: ["id", "nombre"] }],
    });

    if (!producto) return res.status(404).json({ success: false, error: "Producto no encontrado" });

    res.json({ success: true, data: producto });
  } catch (err) {
    console.error("Error en getProductoById:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Crear producto
export const createProducto = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, error: "Datos inválidos", details: errors.array() });

   const { nombre, descripcion, precio, stock, idCategoria, tipoMascota, oferta, descuento, destacado } = req.body;


    const categoria = await Categoria.findByPk(idCategoria);
    if (!categoria) return res.status(404).json({ success: false, error: "Categoría no encontrada" });

    const imgUrl = req.files?.map(file => `/uploads/${file.filename}`) || [];

    const nuevoProducto = await Producto.create({
        nombre: capitalizeFirstLetter(nombre),
        descripcion,
        precio,
        stock,
        idCategoria,
        tipoMascota,
        oferta: oferta || false,
        descuento: descuento || 0,
        destacado: destacado || false, 
        imgUrl,
        });


    res.status(201).json({ success: true, data: nuevoProducto, message: "Producto creado exitosamente" });
  } catch (err) {
    console.error("Error en createProducto:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};




// Actualizar producto
// Actualizar producto (listo para FormData)
export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ success: false, error: "Producto no encontrado" });
    }

    // Manejar imágenes
    const nuevasImgs = req.files?.map(file => `/uploads/${file.filename}`) || [];
    const existentes = JSON.parse(req.body.imagenesExistentes || "[]");
    const imgUrlsActualizadas = [...existentes, ...nuevasImgs];

    // Convertir booleanos enviados por FormData
    const ofertaBool = req.body.oferta === "true";
    const destacadoBool = req.body.destacado === "true";

    // Actualizar producto
    await producto.update({
      nombre: req.body.nombre ? req.body.nombre.charAt(0).toUpperCase() + req.body.nombre.slice(1) : producto.nombre,
      precio: req.body.precio ?? producto.precio,
      stock: req.body.stock ?? producto.stock,
      idCategoria: req.body.idCategoria ?? producto.idCategoria,
      descripcion: req.body.descripcion ?? producto.descripcion,
      tipoMascota: req.body.tipoMascota ?? producto.tipoMascota,
      oferta: ofertaBool,
      descuento: req.body.descuento ?? producto.descuento,
      destacado: destacadoBool,
      imgUrl: imgUrlsActualizadas,
    });

    const productoActualizado = await Producto.findByPk(id, {
      include: [{ model: Categoria, as: "categoria", attributes: ["id", "nombre"] }],
    });

    res.json({ success: true, data: productoActualizado, message: "Producto actualizado exitosamente" });
  } catch (err) {
    console.error("Error en updateProducto:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

 export const updateDestacado = async (req, res) => {
  try {
    const { id } = req.params;
    const { destacado } = req.body;

    const producto = await Producto.findByPk(id);
    if (!producto)
      return res.status(404).json({ success: false, message: "Producto no encontrado" });

    producto.destacado = destacado;
    await producto.save();

    res.json({
      success: true,
      message: "Estado destacado actualizado",
      data: producto,
    });
  } catch (error) {
    console.error("Error al actualizar destacado:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar destacado",
    });
  }
};





// Eliminar producto (físico)
export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ success: false, error: "Producto no encontrado" });

    producto.estado = false;
    await producto.save();

    res.json({ success: true, message: "Producto eliminado exitosamente" });
  } catch (err) {
    console.error("Error en deleteProducto:", err);
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
      where: { idCategoria: id, estado: true  },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["fechaCreacion", "DESC"]],
      include: [{ model: Categoria, as: "categoria", attributes: ["id", "nombre"] }],
    });

    res.json({
      success: true,
      data: productos.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(productos.count / limit),
        totalItems: productos.count,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (err) {
    console.error("Error en getProductosByCategoria:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

export const activarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ success: false, error: "Producto no encontrado" });

    producto.estado = true;
    await producto.save();

    res.json({ success: true, message: "Producto activado exitosamente" });
  } catch (err) {
    console.error("Error en activarProducto:", err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};
 

// Obtener tipos de mascota únicos desde los productos
export const getTiposMascota = async (req, res) => {
  try {
    const tipos = await Producto.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("tipoMascota")), "tipoMascota"]
      ],
      where: {
        tipoMascota: { [Op.ne]: null } // solo los que no son null
      }
    });

    const lista = tipos.map(t => t.get("tipoMascota"));
    res.json({ success: true, data: lista });
  } catch (error) {
    console.error("Error al obtener tipos de mascota:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener tipos de mascota",
      error: error.message,
    });
  }
};