const express = require("express");
const ResponsavelController = require("../controllers/ResponsavelController");

const router = express.Router();

router.post("/Responsavel/", ResponsavelController.create);
router.get("/Responsavel/", ResponsavelController.findAll);
router.get("/Responsavel/:id", ResponsavelController.findOne);
router.put("/Responsavel/:id", ResponsavelController.update);
router.delete("/Responsavel/:id", ResponsavelController.delete);

module.exports = router;