const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/DashboardController.js');

router.get('/controles', DashboardController.getDashboardData);

module.exports = router;