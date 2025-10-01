const express = require('express');
const router = express.Router();
const RoteiroController = require('../controllers/RoteiroController.js');

router.get('/Roteiro/', RoteiroController.listar);
router.get('/Roteiro/:id', RoteiroController.buscarPorId);
router.post('/Roteiro/', RoteiroController.criar);
router.put('/Roteiro/:id', RoteiroController.atualizar);
router.delete('/Roteiro/:id', RoteiroController.deletar);

module.exports = router;
