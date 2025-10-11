import express from "express";
import BairroController from "../controllers/BairroController.js";

const router = express.Router();

router.post("/", BairroController.create);
router.get("/", BairroController.findAll);
router.get("/:id", BairroController.findOne);
router.put("/:id", BairroController.update);
router.delete("/:id", BairroController.delete);

export default router;
