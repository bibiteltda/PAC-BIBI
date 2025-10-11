import express from "express";
import EscolaController from "../controllers/EscolaController.js";

const router = express.Router();

router.post("/", EscolaController.create);
router.get("/", EscolaController.findAll);
router.get("/:id", EscolaController.findOne);
router.put("/:id", EscolaController.update);
router.delete("/:id", EscolaController.delete);

export default router;
