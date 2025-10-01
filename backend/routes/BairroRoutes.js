const express = require("express");
const BairroController = require("../controllers/BairroController");

const router = express.Router();

router.post("/Bairro/", BairroController.create);
router.get("/Bairro/", BairroController.findAll);
router.get("/Bairro/:id", BairroController.findOne);
router.put("/Bairro/:id", BairroController.update);
router.delete("/Bairro/:id", BairroController.delete);

module.exports = router;