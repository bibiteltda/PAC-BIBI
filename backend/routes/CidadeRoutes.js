const express = require("express");
const CidadeController = require("../controllers/CidadeController");

const router = express.Router();

router.post("/", CidadeController.create);
router.get("/", CidadeController.findAll);
router.get("/:id", CidadeController.findOne);
router.put("/:id", CidadeController.update);
router.delete("/:id", CidadeController.delete);

module.exports = router;