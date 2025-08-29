const { validationResult } = require('express-validator');
const authService = require('../services/authService');

exports.registrar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const resultado = await authService.registrarUsuario(req.body);
    res.status(201).json(resultado); // Retorna a mensagem de sucesso
  } catch (error) {
    if (error.message === 'Este e-mail já está em uso.') {
      return res.status(400).json({ msg: error.message });
    }
    console.error(error.message);
    res.status(500).send('Erro no servidor');
  }
};

// --- FUNÇÃO DE LOGIN ---
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const resultado = await authService.loginUsuario(req.body);
        res.status(200).json(resultado); // Retorna token e info do usuário
    } catch (error) {
        if (error.message === 'Credenciais inválidas.' || error.message === 'Por favor, verifique seu e-mail antes de fazer login.') {
            return res.status(401).json({ msg: error.message }); // 401 Unauthorized
        }
        console.error(error.message);
        res.status(500).send('Erro no servidor');
    }
};