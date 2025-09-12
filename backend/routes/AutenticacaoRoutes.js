const express = require("express");
const AutenticacaoController = require("../controllers/AutenticacaoController");

const router = express.Router();

router.post("/", AutenticacaoController.create);
router.get("/", AutenticacaoController.findAll);
router.get("/:id", AutenticacaoController.findOne);
router.put("/:id", AutenticacaoController.update);
router.delete("/:id", AutenticacaoController.delete);

module.exports = router;