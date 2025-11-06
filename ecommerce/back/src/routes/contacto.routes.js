import { Router } from 'express';
import { enviarCorreo } from '../controllers/contactoController.js';

const router = Router();

router.post('/', enviarCorreo);

export default router;
