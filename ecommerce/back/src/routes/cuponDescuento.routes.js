import { Router } from 'express';
import {
  getCupones,
  getCuponById,
  createCupon,
  updateCupon,
  deleteCupon,
  validarCupon
} from '../controllers/cuponDescuentoController.js';

const router = Router();

router.get('/', getCupones);
router.get('/validar/:codigo', validarCupon);  
router.get('/:codigo', getCuponById);          
router.post('/', createCupon);
router.put('/:codigo', updateCupon);
router.delete('/:codigo', deleteCupon);

export default router;
