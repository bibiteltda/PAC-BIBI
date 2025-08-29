const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

// Rota de Registro
router.post('/registrar', [
    check('nome', 'O nome é obrigatório').not().isEmpty(),
    check('email', 'Por favor, inclua um e-mail válido').isEmail(),
    check('senha', 'A senha deve ter 6 ou mais caracteres').isLength({ min: 6 }),
    check('cpf', 'O CPF é obrigatório').not().isEmpty(),
    check('celular', 'O celular é obrigatório').not().isEmpty(),
    check('role', 'O papel (role) do usuário é obrigatório').isIn(['condutor', 'responsavel']),
  ], authController.registrar);

// --- NOVA ROTA DE LOGIN ---
router.post('/login', [
    check('email', 'O e-mail é obrigatório').isEmail(),
    check('senha', 'A senha é obrigatória').not().isEmpty()
], authController.login);

module.exports = router;