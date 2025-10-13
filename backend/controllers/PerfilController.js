import { sequelize, models } from '../index.js';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

function validarCPF(cpf) {
  return cpfValidator.isValid(cpf);
}

function validarTelefone(telefone) {
  const apenasDigitos = String(telefone).replace(/\D/g, '');
  return /^\d{10,11}$/.test(apenasDigitos);
}

export const criar = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id_autenticacao, tipoPerfil, nome, cpf, contato } = req.body;

    if (!id_autenticacao || !tipoPerfil || !nome || !cpf || !contato) {
      await t.rollback(); 
      return res.status(400).json({ message: 'Todos os campos para a criação do perfil são obrigatórios.' });
    }

    if (!validarCPF(cpf)) {
      await t.rollback();
      return res.status(400).json({ message: 'O CPF digitado é inválido.' });
    }
    if (!validarTelefone(contato)) {
      await t.rollback();
      return res.status(400).json({ message: 'O telefone digitado é inválido.' });
    }

    const autenticacao = await models.Autenticacao.findByPk(id_autenticacao);
    if (!autenticacao) {
      await t.rollback();
      return res.status(404).json({ message: 'Conta de autenticação não encontrada.' });
    }

    let perfilCriado;

    if (tipoPerfil === 'motorista') {
      perfilCriado = await models.Motorista.create({ nome, cpf, contato, id_autenticacao }, { transaction: t });
      await models.Autenticacao.update({ role: 'motorista' }, { where: { id_autenticacao }, transaction: t });
    } else if (tipoPerfil === 'responsavel') {
      perfilCriado = await models.Responsavel.create({ nome, cpf, contato, id_autenticacao }, { transaction: t });
      await models.Autenticacao.update({ role: 'responsavel' }, { where: { id_autenticacao }, transaction: t });
    } else {
      await t.rollback();
      return res.status(400).json({ message: 'Tipo de perfil inválido. Use "motorista" ou "responsavel".' });
    }

    await t.commit();
    res.status(201).json({ success: true, message: `Perfil de ${tipoPerfil} criado com sucesso!`, data: perfilCriado });

  } catch (error) {
    
    await t.rollback();
    console.error('Erro ao criar perfil:', error);
    res.status(500).json({ message: 'Ocorreu um erro no servidor ao criar o perfil.' });
  }
};