// usuarios.routes.js
import express from "express";
import {
  getUsuarios,
  getUsuarioById,
  getAdministradores,
  createUsuario,
  updateUsuario,
  deleteUsuario,
    getClientes,
  softDeleteUsuario,
  restoreUsuario
} from "../controllers/usuarioController.js";
import {
  validateUsuarioCreate,
  validateUsuarioUpdate,
  validateUsuarioId,
  validatePagination
} from "../middleware/validation.js";

const router = express.Router(); 

// Rutas
router.get("/", validatePagination, getUsuarios);
router.get("/administradores", getAdministradores);
router.get("/clientes", getClientes);
router.get("/:id", validateUsuarioId, getUsuarioById);
router.post("/", validateUsuarioCreate, createUsuario);
router.put("/:id", validateUsuarioId, validateUsuarioUpdate, updateUsuario);
router.put("/:id/desactivar", softDeleteUsuario);
router.put("/:id/restaurar", restoreUsuario);
router.delete("/:id", validateUsuarioId, deleteUsuario);


export default router;
