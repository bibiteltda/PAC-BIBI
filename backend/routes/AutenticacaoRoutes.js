const express = require("express");
const AutenticacaoController = require("../controllers/AutenticacaoController");

const router = express.Router();

router.post("/Autenticacao/", AutenticacaoController.create);
router.get("/Autenticacao/", AutenticacaoController.findAll);
router.get("/Autenticacao/:id", AutenticacaoController.findOne);
router.put("/Autenticacao/:id", AutenticacaoController.update);
router.delete("/Autenticacao/:id", AutenticacaoController.delete);

module.exports = router;