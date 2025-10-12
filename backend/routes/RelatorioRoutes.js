import express from 'express';
import relatorioController from '../controllers/RelatorioController.js';

const router = express.Router();

router.get('/', relatorioController.buscarFiltrados);

export default router;
