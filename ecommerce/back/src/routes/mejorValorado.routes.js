import { Router } from 'express';
import {
    votarProductos,
    obtenerMejorValorados
} from '../controllers/mejorValoradoController.js';

const router = Router();

//get
router.get('/mejor-valorados', obtenerMejorValorados)

//post
router.post('/productos/:productoId/votar', votarProductos);

export default router;

