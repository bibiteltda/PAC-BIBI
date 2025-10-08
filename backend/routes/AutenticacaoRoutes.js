const express = require("express");
const AutenticacaoController = require("../controllers/AutenticacaoController.js");

const router = express.Router();

router.post("/Autenticacao/", AutenticacaoController.create);
router.get("/", AutenticacaoController.findAll);
router.get("/:id", AutenticacaoController.findOne);
router.put("/:id", AutenticacaoController.update);
router.delete("/:id", AutenticacaoController.delete);

module.exports = router;