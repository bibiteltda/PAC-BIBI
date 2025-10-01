const express = require("express");
const AlunoController = require("../controllers/AlunoController");

const router = express.Router();

router.post("/Aluno/", AlunoController.create);
router.get("/Aluno/", AlunoController.findAll);
router.get("/Aluno/:id", AlunoController.findOne);
router.put("/Aluno/:id", AlunoController.update);
router.delete("/Aluno/:id", AlunoController.delete);

module.exports = router;