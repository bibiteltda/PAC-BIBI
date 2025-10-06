const express = require('express');
const router = express.Router();
const RoteiroController = require('../controllers/RoteiroController.js');

router.get('/', RoteiroController.listar);
router.get('/:id', RoteiroController.buscarPorId);
router.post('/', RoteiroController.criar);
router.put('/:id', RoteiroController.atualizar);
router.delete('/:id', RoteiroController.deletar);

module.exports = router;
