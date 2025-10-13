import express from 'express';
import RoteiroEscolaController from '../controllers/RoteiroEscolaController.js';

const router = express.Router();

router.get('/', RoteiroEscolaController.listar);
router.post('/', RoteiroEscolaController.criar);
router.delete('/:id', RoteiroEscolaController.deletar);

export default router;
