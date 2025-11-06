import { Router } from 'express';
import {
  getMensajes,
  getMensajeById,
  createMensaje,
  updateMensaje,
    deleteMensaje,
    getMensajesByProducto
} from '../controllers/mensajeController.js';

const router = Router();

router.get('/', getMensajes);         
router.get('/:id', getMensajeById);    
router.post('/', createMensaje);        
router.put('/:id', updateMensaje);      
router.delete('/:id', deleteMensaje);   
router.get('/producto/:idProducto', getMensajesByProducto);
export default router;
