// src/middleware/validation.js
import { body, param, query } from 'express-validator';


export const validateProductoCreate = [
  body('nombre')
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('precio')
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0'),
  body('stock')
    .isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0'),
  body('categoriaId')
    .optional()
    .isInt({ min: 1 }).withMessage('El ID de categoría debe ser un número entero positivo'),
  body('descripcion')
    .optional()
    .isLength({ max: 1000 }).withMessage('La descripción no puede exceder 1000 caracteres')
];

export const validateProductoUpdate = [
  body('nombre')
    .optional()
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('precio')
    .optional()
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0'),
  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0'),
  body('categoriaId')
    .optional()
    .isInt({ min: 1 }).withMessage('El ID de categoría debe ser un número entero positivo'),
  body('descripcion')
    .optional()
    .isLength({ max: 1000 }).withMessage('La descripción no puede exceder 1000 caracteres')
];

export const validateProductoId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo')
];

/* ===========================
   VALIDACIONES PARA CATEGORÍAS
=========================== */
export const validateCategoriaCreate = [
  body('nombre')
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('descripcion')
    .optional()
    .isLength({ max: 1000 }).withMessage('La descripción no puede exceder 1000 caracteres')
];

export const validateCategoriaUpdate = [
  body('nombre')
    .optional()
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('descripcion')
    .optional()
    .isLength({ max: 1000 }).withMessage('La descripción no puede exceder 1000 caracteres')
];

export const validateCategoriaId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo')
];

/* ===========================
   VALIDACIONES PARA USUARIOS
=========================== */
export const validateUsuarioCreate = [
  body('nombre')
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  body('email')
    .isEmail().withMessage('Debe ser un email válido')
    .normalizeEmail(),
  body('rolId')
    .isInt({ min: 1 }).withMessage('El rol debe ser un número entero positivo')
];

export const validateUsuarioUpdate = [
  body('nombre')
    .optional()
    .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  body('email')
    .optional()
    .isEmail().withMessage('Debe ser un email válido')
    .normalizeEmail(),
  body('rolId')
    .optional()
    .isInt({ min: 1 }).withMessage('El rol debe ser un número entero positivo')
];

export const validateUsuarioId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo')
];

/* ===========================
   VALIDACIONES DE PAGINACIÓN
=========================== */
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('La página debe ser un número entero positivo'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('El límite debe ser un número entre 1 y 100')
];

// Validaciones para roles
export const validateRolCreate = [
  body('codigo')
    .notEmpty().withMessage('El código es requerido')
    .isLength({ min: 2, max: 20 }).withMessage('El código debe tener entre 2 y 10 caracteres'),
  body('descripcion')
    .notEmpty().withMessage('La descripción es requerida')
    .isLength({ max: 100 }).withMessage('La descripción no puede exceder 100 caracteres')
];

export const validateRolUpdate = [
  body('codigo')
    .optional()
    .isLength({ min: 2, max: 10 }).withMessage('El código debe tener entre 2 y 10 caracteres'),
  body('descripcion')
    .optional()
    .isLength({ max: 100 }).withMessage('La descripción no puede exceder 100 caracteres')
];

export const validateRolId = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo')
];