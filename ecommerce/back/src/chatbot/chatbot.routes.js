import { Router } from "express";
import { chatQuery } from "./chatbotController.js";
;

const router = Router();

router.post("/chat-query", chatQuery);

export default router;
