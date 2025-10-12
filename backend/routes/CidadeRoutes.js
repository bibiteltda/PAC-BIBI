import express from "express";
import CidadeController from "../controllers/CidadeController.js";

const router = express.Router();

router.post("/", CidadeController.create);
router.get("/", CidadeController.findAll);
router.get("/:id", CidadeController.findOne);
router.put("/:id", CidadeController.update);
router.delete("/:id", CidadeController.delete);

export default router;
