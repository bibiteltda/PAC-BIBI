const express = require("express");
const EscolaController = require("../controllers/EscolaController");

const router = express.Router();

router.post("/Escola/", EscolaController.create);
router.get("/Escola/", EscolaController.findAll);
router.get("/Escola/:id", EscolaController.findOne);
router.put("/Escola/:id", EscolaController.update);
router.delete("/Escola/:id", EscolaController.delete);

module.exports = router;