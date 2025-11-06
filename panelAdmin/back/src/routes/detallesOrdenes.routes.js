import { Router } from 'express';
import {
  getDetalleOrden,
  getDetalleOrdenById,
  createDetalleOrden,
  updateDetalleOrden,
  deleteDetalleOrden
} from '../controllers/detalleOrdenController.js';

const router = Router();

router.get('/', getDetalleOrden);
router.get('/:id', getDetalleOrdenById);
router.post('/', createDetalleOrden);
router.put('/:id', updateDetalleOrden);
router.delete('/:id', deleteDetalleOrden);

export default router;
