const express = require("express");
const { sendCode, verifyCode } = require("../controllers/auth_mail_controller.js");

const router = express.Router();

router.post("/request-code", sendCode);
router.post("/verify-code", verifyCode);

module.exports = router;
