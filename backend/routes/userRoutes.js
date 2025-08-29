const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// @route   PUT api/user/me
// @desc    Atualiza informações do usuário logado
// @access  Private
router.put(
    '/me',
    [
        authMiddleware, // <-- Middleware de proteção!
        [ // Validações dos campos que podem ser atualizados
            check('nome', 'Nome não pode ser vazio').optional().not().isEmpty(),
            check('celular', 'Celular não pode ser vazio').optional().not().isEmpty()
        ]
    ],
    userController.atualizar
);

module.exports = router;