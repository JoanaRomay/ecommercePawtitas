import { Router } from "express";
import { 
  getRoles, 
  getRolById, 
  createRol, 
  updateRol, 
  deleteRol 
} from "../controllers/rolController.js";

import { validateRolCreate, validateRolUpdate, validateRolId } from "../middleware/validation.js";

const router = Router();

router.get("/", getRoles);
router.get("/:id", validateRolId, getRolById);
router.post("/", validateRolCreate, createRol);
router.put("/:id", validateRolId, validateRolUpdate, updateRol);
router.delete("/:id", validateRolId, deleteRol);

export default router;
