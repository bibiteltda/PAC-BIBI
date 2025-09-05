const express = require("express");
const MotoristaController = require("../controllers/MotoristaController");

const router = express.Router();

router.post("/", MotoristaController.create);
router.get("/", MotoristaController.findAll);
router.get("/:id", MotoristaController.findOne);
router.put("/:id", MotoristaController.update);
router.delete("/:id", MotoristaController.delete);

module.exports = router;