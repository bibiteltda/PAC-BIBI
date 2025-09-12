const express = require("express");
const EscolaController = require("../controllers/EscolaController");

const router = express.Router();

router.post("/", EscolaController.create);
router.get("/", EscolaController.findAll);
router.get("/:id", EscolaController.findOne);
router.put("/:id", EscolaController.update);
router.delete("/:id", EscolaController.delete);

module.exports = router;