import { Router } from "express";
import { authAdmin } from "../middleware/authAdmin.js";
import { dashboardController } from "../controllers/adminController.js"; // ✅


const router = Router();

// Dashboard solo para admins
router.get("/dashboard", authAdmin, dashboardController);

export default router;
