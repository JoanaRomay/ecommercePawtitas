import { Router } from "express";

import authRouter from "./auth.routes.js";
import adminRouter from "./admin.routes.js";
import usuariosRouter from "./usuarios.routes.js";
import productosRouter from "./productos.routes.js";
import categoriasRouter from "./categorias.routes.js";
import ordenesRouter from "./ordenes.routes.js";
import detallesOrdenesRouter from "./detallesOrdenes.routes.js";
import rolesRouter from "./roles.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/usuarios", usuariosRouter);
router.use("/productos", productosRouter);
router.use("/categorias", categoriasRouter);
router.use("/ordenes", ordenesRouter);
router.use("/detalles-ordenes", detallesOrdenesRouter);
router.use("/roles", rolesRouter);

export default router;
