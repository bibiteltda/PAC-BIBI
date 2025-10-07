import { Router } from "express";
import { sendCode, verifyCode } from "../controllers/auth_mail_controller.js";

const router = Router();

router.post("/request-code", sendCode);
router.post("/verify-code", verifyCode);

export default router;