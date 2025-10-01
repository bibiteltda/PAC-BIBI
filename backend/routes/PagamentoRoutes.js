const express = require("express");
const PagamentoController = require("../controllers/PagamentoController");

const router = express.Router();

router.post("/Pagamento/", PagamentoController.create);
router.get("/Pagamento/", PagamentoController.findAll);
router.get("/Pagamento/:id", PagamentoController.findOne);
router.put("/Pagamento/:id", PagamentoController.update);
router.delete("/Pagamento/:id", PagamentoController.delete);

module.exports = router;