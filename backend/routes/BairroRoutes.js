const express = require("express");
const BairroController = require("../controllers/BairroController.js");

const router = express.Router();

router.post("/", BairroController.create);
router.get("/", BairroController.findAll);
router.get("/:id", BairroController.findOne);
router.put("/:id", BairroController.update);
router.delete("/:id", BairroController.delete);

module.exports = router;