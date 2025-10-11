import express from "express";
import PagamentoController from "../controllers/PagamentoController.js";

const router = express.Router();

router.post("/", PagamentoController.create);
router.get("/", PagamentoController.findAll);
router.get("/:id", PagamentoController.findOne);
router.put("/:id", PagamentoController.update);
router.delete("/:id", PagamentoController.delete);

export default router;
