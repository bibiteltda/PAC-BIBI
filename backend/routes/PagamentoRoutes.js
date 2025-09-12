const express = require("express");
const PagamentoController = require("../controllers/PagamentoController");

const router = express.Router();

router.post("/", PagamentoController.create);
router.get("/", PagamentoController.findAll);
router.get("/:id", PagamentoController.findOne);
router.put("/:id", PagamentoController.update);
router.delete("/:id", PagamentoController.delete);

module.exports = router;