const express = require("express");
const MotoristaController = require("../controllers/MotoristaController");

const router = express.Router();

router.post("/Motorista/", MotoristaController.create);
router.get("/Motorista/", MotoristaController.findAll);
router.get("/Motorista/:id", MotoristaController.findOne);
router.put("/Motorista/:id", MotoristaController.update);
router.delete("/Motorista/:id", MotoristaController.delete);

module.exports = router;