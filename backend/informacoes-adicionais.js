const { sequelize, models } = require('./index.js'); 
const { cpf: cpfValidator } = require('cpf-cnpj-validator');

function validarCPF(cpf) {
  return cpfValidator.isValid(cpf);
}
function validarTelefone(telefone) {
  const apenasDigitos = telefone.replace(/\D/g, '');
  const regex = /^\d{10,11}$/;
  return regex.test(apenasDigitos);
}

/**
 * @param {object} dados 
 * @returns {object} 
 */
async function criarPerfil(dados) {
  
  const { id_autenticacao, tipoPerfil, nome, cpf, contato, id_escola } = dados;
  
  if (!id_autenticacao || !tipoPerfil || !nome || !cpf || !contato) {
    throw new Error('Todos os campos para a criação do perfil são obrigatórios.');
  }
  if (!validarCPF(cpf)) {
    throw new Error('O CPF digitado é inválido.');
  }
  if (!validarTelefone(contato)) {
    throw new Error('O telefone digitado é inválido.');
  }

  try {

    if (tipoPerfil === 'motorista') {
      const motorista = await models.Motorista.create({ nome, cpf, contato, id_autenticacao });
      await models.Autenticacao.update({ role: 'motorista' }, { where: { id_autenticacao } });
      return { success: true, message: 'Perfil de Motorista cadastrado com sucesso!', data: motorista };

    } else if (tipoPerfil === 'responsavel') {
      const responsavel = await models.Responsavel.create({ nome, cpf, contato, id_autenticacao });
      await models.Autenticacao.update({ role: 'responsavel' }, { where: { id_autenticacao } });
      return { success: true, message: 'Perfil de Responsável cadastrado com sucesso!', data: responsavel };
      
    } else {
      throw new Error('Tipo de perfil inválido.');
    }
  } catch (error) {
    console.error('Erro ao criar perfil:', error.message);
    throw error;
  }
}

module.exports = {
  criarPerfil
};