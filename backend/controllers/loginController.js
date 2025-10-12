const bcrypt = require('bcrypt');
const { models } = require('../database/index.js'); 
const autenticar = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const usuario = await models.Autenticacao.findOne({
      where: { login: email }
    });

    if (!usuario) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    const usuarioLogado = {
      id_autenticacao: usuario.id_autenticacao,
      login: usuario.login,
      role: usuario.role
    };
    res.status(200).json({ message: "Login bem-sucedido!", usuario: usuarioLogado });

  } catch (error) {
    console.error("Erro inesperado durante o login:", error);
    res.status(500).json({ message: 'Ocorreu um erro no servidor. Tente novamente.' });
  }
};

module.exports = {
  autenticar
};