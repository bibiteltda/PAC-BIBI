import express from 'express';
import relatorioController from '../controllers/relatorioController.js';

const router = express.Router();

router.get('/', relatorioController.buscarFiltrados);

export default router;
