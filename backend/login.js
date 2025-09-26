const bcrypt = require('bcrypt');
const { models } = require('./index.js'); 
/**
 * 
 * @param {string} email 
 * @param {string} senha 
 * @returns {object} 
 * @throws {Error} 
 */
async function fazerLogin(email, senha) {
  if (!email || !senha) {
    throw new Error('Email e senha são obrigatórios.');
  }
  try {
    const usuario = await models.Autenticacao.findOne({
      where: { login: email }
    });
    if (!usuario) {
      throw new Error('Email ou senha inválidos.');
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      throw new Error('Email ou senha inválidos.');
    }

    const usuarioLogado = {
      id_autenticacao: usuario.id_autenticacao,
      login: usuario.login,
      role: usuario.role
    };

    return usuarioLogado;

  } catch (error) {
    if (error.message === 'Email ou senha inválidos.' || error.message === 'Email e senha são obrigatórios.') {
        throw error;
    }
    throw new Error('Ocorreu um erro durante o login. Tente novamente.');
  }
}
module.exports = {
  fazerLogin
};