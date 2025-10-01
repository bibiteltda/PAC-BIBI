const express = require("express");
const CidadeController = require("../controllers/CidadeController");

const router = express.Router();

router.post("/Cidade/", CidadeController.create);
router.get("/Cidade/", CidadeController.findAll);
router.get("/Cidade/:id", CidadeController.findOne);
router.put("/Cidade/:id", CidadeController.update);
router.delete("/Cidade/:id", CidadeController.delete);

module.exports = router;