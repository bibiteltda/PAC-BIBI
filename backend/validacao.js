const bcrypt = require('bcrypt');
const { models } = require('./index.js');

function validarForcaSenha(senha) {
  const minLength = senha.length >= 6;
  const hasUpper = /[A-Z]/.test(senha);
  const hasLower = /[a-z]/.test(senha);
  const hasNumber = /\d/.test(senha);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
  return minLength && hasUpper && hasLower && hasNumber && hasSpecial;
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return regex.test(email);
}

/**
 *
 * @param {string} email 
 * @param {string} senha 
 * @param {string} confirmarSenha 
 * @returns {object} 
 * @throws {Error} 
 */
async function criarConta(email, senha, confirmarSenha) {

  if (!email || !senha || !confirmarSenha) {
    throw new Error('Email, senha e confirmação de senha são obrigatórios.');
  }
  if (senha !== confirmarSenha) {
    throw new Error('As senhas não coincidem.');
  }
  if (!validarEmail(email)) {
    throw new Error('O formato do email é inválido.');
  }
  if (!validarForcaSenha(senha)) {
    throw new Error('A senha é fraca. Precisa ter no mínimo 6 caracteres, incluindo maiúscula, minúscula, número e caractere especial.');
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await models.Autenticacao.create({
      login: email,
      senha: senhaHash,
      role: 'pendente' 
    });

    return novoUsuario;
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new Error('Este email já está cadastrado.');
    }
    throw error;
  }
}

module.exports = {
  criarConta
};