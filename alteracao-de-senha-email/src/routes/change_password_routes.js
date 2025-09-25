import { Router } from "express";
import { sendResetLink, resetPassword } from "../controllers/change_password_controller.js";

const router = Router();

router.post("/request-reset-psw", sendResetLink);
router.post("/reset-psw", resetPassword);

export default router;