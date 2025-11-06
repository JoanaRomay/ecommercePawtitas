import { Router } from "express";
import { 
  getProductos, 
  getProductoById, 
  createProducto, 
  updateProducto, 
  deleteProducto, 
    getProductosByCategoria,
    activarProducto,getTiposMascota, updateDestacado, 

} from "../controllers/productoController.js";

import { 
  validateProductoCreate, 
  validateProductoUpdate, 
  validateProductoId, 
  validatePagination 
} from "../middleware/validation.js";
import { authAdmin } from "../middleware/authAdmin.js";

import { upload } from "../middleware/multer.js"; 

const router = Router();
router.get('/tipos-mascota', getTiposMascota);

router.get("/", validatePagination, getProductos);

router.get("/:id", validateProductoId, getProductoById);

router.get("/:id/categoria", validateProductoId, validatePagination, getProductosByCategoria);

router.post("/", upload.array('imagenes', 10), validateProductoCreate, createProducto);

router.put("/:id", upload.array('imagenes', 10), validateProductoId, validateProductoUpdate, updateProducto);

router.delete("/:id", validateProductoId, deleteProducto);
router.put("/:id/activar", authAdmin, activarProducto); 

router.put("/:id/destacado", updateDestacado);



export default router;
