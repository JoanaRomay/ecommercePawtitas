import { Router } from 'express';
import {
  getProductosByCarrito,
  addProductoToCarrito,
  updateCantidad,
  deleteProductoFromCarrito
} from '../controllers/carritoXProductoController.js';

const router = Router();

router.get('/:idCarrito', getProductosByCarrito);         
router.post('/', addProductoToCarrito);                   
router.put('/:id', updateCantidad);                       
router.delete('/:id', deleteProductoFromCarrito);         

export default router;
