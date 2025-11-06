import { Router } from "express";
import passport from "passport";

import { loginAdmin, loginGoogleCallback } from "../controllers/loginController.js";


const router = Router();
//login normal
router.post("/login", loginAdmin);

//login google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback Google + generar JWT
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  loginGoogleCallback
);



export default router;

