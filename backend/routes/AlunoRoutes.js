const express = require("express");
const AlunoController = require("../controllers/AlunoController");

const router = express.Router();

router.post("/", AlunoController.create);
router.get("/", AlunoController.findAll);
router.get("/:id", AlunoController.findOne);
router.put("/:id", AlunoController.update);
router.delete("/:id", AlunoController.delete);

module.exports = router;