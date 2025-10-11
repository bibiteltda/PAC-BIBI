import express from "express";
import AutenticacaoController from "../controllers/AutenticacaoController.js";

const router = express.Router();

router.post("/Autenticacao/", AutenticacaoController.create);
router.get("/", AutenticacaoController.findAll);
router.get("/:id", AutenticacaoController.findOne);
router.put("/:id", AutenticacaoController.update);
router.delete("/:id", AutenticacaoController.delete);

export default router;
