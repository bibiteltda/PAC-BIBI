// routes/MotoristaRoutes.js
import express from "express";
import MotoristaController from "../controllers/MotoristaController.js";

const router = express.Router();

router.post("/", MotoristaController.create);
router.get("/", MotoristaController.findAll);
router.get("/:id", MotoristaController.findOne);
router.put("/:id", MotoristaController.update);
router.delete("/:id", MotoristaController.delete);

export default router;