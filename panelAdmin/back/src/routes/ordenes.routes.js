import { Router } from 'express';
import {
  getOrdenes,
  getOrdenById,
  createOrden,
  updateOrden,
  deleteOrden
} from '../controllers/ordenController.js';

const router = Router();

router.get('/', getOrdenes);
router.get('/:id', getOrdenById);
router.post('/', createOrden);
router.put('/:id', updateOrden);
router.delete('/:id', deleteOrden);

export default router;
