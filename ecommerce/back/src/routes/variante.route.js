import { Router } from 'express';
import { getVariantesPorProducto } from '../controllers/varianteController.js';


const router = Router();

router.get('/productos/:productoId/variantes', getVariantesPorProducto);

export default router;
