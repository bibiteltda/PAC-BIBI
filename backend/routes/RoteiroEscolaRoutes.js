const express = require('express');
const router = express.Router();
const RoteiroEscolaController = require('../controllers/RoteiroEscolaController.js');

router.get('/RoteiroEscola/', RoteiroEscolaController.listar);
router.post('/RoteiroEscola/', RoteiroEscolaController.criar);
router.delete('/RoteiroEscola/:id', RoteiroEscolaController.deletar);

module.exports = router;
