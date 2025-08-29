const { validationResult } = require('express-validator');
const userService = require('../services/userService');

exports.atualizar = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const idUsuario = req.user.id; // Vem do middleware
        const roleUsuario = req.user.role; // Vem do middleware
        
        const perfilAtualizado = await userService.atualizarInformacoes(idUsuario, roleUsuario, req.body);

        res.status(200).json(perfilAtualizado);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erro no servidor');
    }
};