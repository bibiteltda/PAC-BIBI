import express from 'express';
import { criar } from '../controllers/PerfilController.js';

const router = express.Router();
router.post('/', criar);

export default router;