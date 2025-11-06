import CuponDescuento from '../models/CuponDescuento.js';

// Obtener todos los cupones
export const getCupones = async (req, res) => {
  const cupones = await CuponDescuento.findAll();
  res.json(cupones);
};

// Obtener cupón por ID
export const getCuponById = async (req, res) => {
  const cupon = await CuponDescuento.findByPk(req.params.id);
  if (!cupon) return res.status(404).json({ error: 'Cupón no encontrado' });
  res.json(cupon);
};

// Crear cupón
export const createCupon = async (req, res) => {
  const { nombreCupon, codigoCupon, porcentajeDescuento, activo } = req.body;
  try {
    const nuevo = await CuponDescuento.create({
      nombreCupon, codigoCupon, porcentajeDescuento, activo
    });
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear cupón' });
  }
};

// Actualizar cupón
export const updateCupon = async (req, res) => {
  const { id } = req.params;
  const cupon = await CuponDescuento.findByPk(id);
  if (!cupon) return res.status(404).json({ error: 'Cupón no encontrado' });
  await cupon.update(req.body);
  res.json(cupon);
};

// Eliminar cupón
export const deleteCupon = async (req, res) => {
  const { id } = req.params;
  const cupon = await CuponDescuento.findByPk(id);
  if (!cupon) return res.status(404).json({ error: 'Cupón no encontrado' });
  await cupon.destroy();
  res.json({ mensaje: 'Cupón eliminado' });
};

// Validar código de cupón
export const validarCupon = async (req, res) => {
  const { codigo } = req.params;
  const cupon = await CuponDescuento.findOne({
    where: { codigoCupon: codigo, activo: true }
  });
  if (!cupon) {
    return res.status(404).json({ error: 'Cupón inválido o inactivo' });
  }
  res.json(cupon);
};
