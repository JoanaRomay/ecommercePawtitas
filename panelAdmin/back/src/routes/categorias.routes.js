import { Router } from 'express';
import { 
  getCategorias, 
  getCategoriaById, 
  createCategoria, 
  updateCategoria, 
  softDeleteCategoria, 
  restoreCategoria, 
  getProductosByCategoria 
} from '../controllers/categoriaController.js';
import { 
  validateCategoriaCreate, 
  validateCategoriaUpdate, 
  validateCategoriaId, 
  validatePagination 
} from '../middleware/validation.js';

const router = Router();

// Listar categorías
router.get('/', validatePagination, getCategorias);

// Obtener categoría por ID
router.get('/:id', validateCategoriaId, getCategoriaById);

// Obtener productos por categoría
router.get('/:id/productos', validateCategoriaId, validatePagination, getProductosByCategoria);

// Crear categoría
router.post('/', validateCategoriaCreate, createCategoria);

// Actualizar categoría
router.put('/:id', validateCategoriaId, validateCategoriaUpdate, updateCategoria);

// Desactivar categoría (soft delete)
router.delete('/:id', validateCategoriaId, softDeleteCategoria);

// Restaurar categoría
router.patch('/:id/restore', validateCategoriaId, restoreCategoria);

export default router;
