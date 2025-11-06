import { Router } from "express";
import {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  loginConGoogle,
} from "../controllers/clienteController.js";

const router = Router();

router.get("/", getClientes);
router.get("/:id", getClienteById);
router.post("/", createCliente);
router.put("/:id", updateCliente);
router.delete("/:id", deleteCliente);

// 🔹 Nueva ruta para login con Google
router.post("/auth/google", loginConGoogle);

export default router;
