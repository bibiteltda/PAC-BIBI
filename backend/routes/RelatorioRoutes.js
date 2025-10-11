const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController.js');

router.get('/', relatorioController.buscarFiltrados);
module.exports = router;