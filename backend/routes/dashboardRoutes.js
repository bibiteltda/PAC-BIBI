import express from 'express';
import DashboardController from '../controllers/DashboardController.js';

const router = express.Router();

router.get('/controles', DashboardController.getDashboardData);

export default router;
