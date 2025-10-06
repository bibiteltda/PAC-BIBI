const express = require('express');
const router = express.Router();
const RoteiroEscolaController = require('../controllers/RoteiroEscolaController.js');

router.get('/', RoteiroEscolaController.listar);
router.post('/', RoteiroEscolaController.criar);
router.delete('/:id', RoteiroEscolaController.deletar);

module.exports = router;
