import { Router } from "express";
import { getProductos, getProductoById, getProductosDestacados  } from "../controllers/productoController.js";
import { getMensajesByProducto, createMensaje } from '../controllers/mensajeController.js';

const router = Router();

router.get("/", getProductos);router.get("/destacados", getProductosDestacados);

router.get("/:id", getProductoById);
// Mensajes relacionados a un producto
router.get('/:id/mensajes', getMensajesByProducto);
router.post('/:id/mensajes', createMensaje);



export default router;
