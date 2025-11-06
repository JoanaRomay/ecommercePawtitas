import { Router } from "express";

import carritoRoutes from "./carritos.routes.js"; 
import categoriaRoutes from "./categorias.routes.js";
import detalleOrdenRoutes from "./detallesOrdenes.routes.js";
import ordenRoutes from "./ordenes.routes.js";
import mensajesRoutes from "./mensajes.routes.js";
import clienteRoutes from "./clientes.routes.js";
import carritoProductoRoutes from "./carritoXProducto.routes.js";
import administradorRoutes from "./administrador.routes.js";
import cuponDescuentoRoutes from "./cuponDescuento.routes.js";
import variantesRoutes from "./variante.route.js";
import mejorValoradoRoutes from "./mejorValorado.routes.js";
import productosRoutes from "./productos.routes.js";
import chatbotRoutes from "../chatbot/chatbot.routes.js";

const router = Router();

router.use("/productos", productosRoutes);
router.use("/categorias", categoriaRoutes);
router.use("/carritos", carritoRoutes);
router.use("/ordenes", ordenRoutes);
router.use("/detallesordenes", detalleOrdenRoutes);
router.use("/mensajes", mensajesRoutes);
router.use("/clientes", clienteRoutes);
router.use("/carritosproductos", carritoProductoRoutes);
router.use("/administradores", administradorRoutes);
router.use("/cuponesDescuentos", cuponDescuentoRoutes);
import contactoRoutes from '../routes/contacto.routes.js';

router.use("/", variantesRoutes);
router.use("/", mejorValoradoRoutes);
router.use('/contacto', contactoRoutes);

router.use("/chat", chatbotRoutes);

export default router;
