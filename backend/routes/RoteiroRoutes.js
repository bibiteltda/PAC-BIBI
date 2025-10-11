import express from 'express';
import RoteiroController from '../controllers/RoteiroController.js';

const router = express.Router();

router.get('/', RoteiroController.listar);
router.get('/:id', RoteiroController.buscarPorId);
router.post('/', RoteiroController.criar);
router.put('/:id', RoteiroController.atualizar);
router.delete('/:id', RoteiroController.deletar);

export default router;
