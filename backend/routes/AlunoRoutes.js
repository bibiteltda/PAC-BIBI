import express from "express";
import AlunoController from "../controllers/AlunoController.js";

const router = express.Router();

router.post("/", AlunoController.create);
router.get("/", AlunoController.findAll);
router.get("/:id", AlunoController.findOne);
router.put("/:id", AlunoController.update);
router.delete("/:id", AlunoController.delete);

export default router;