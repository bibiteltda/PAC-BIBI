const express = require("express");
const ResponsavelController = require("../controllers/ResponsavelController.js");

const router = express.Router();

router.post("/", ResponsavelController.create);
router.get("/", ResponsavelController.findAll);
router.get("/:id", ResponsavelController.findOne);
router.put("/:id", ResponsavelController.update);
router.delete("/:id", ResponsavelController.delete);

module.exports = router;