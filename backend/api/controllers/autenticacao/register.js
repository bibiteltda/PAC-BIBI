const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Registrar usuário',
  description: 'Cria motorista ou responsável e vincula à autenticação.',

  inputs: {
    role: { type: 'string', required: true, isIn: ['motorista', 'responsavel'] },
    login: { type: 'string', required: true },
    senha: { type: 'string', required: true },
    nome: { type: 'string', required: true },
    contato: { type: 'string', required: false },
    cpf: { type: 'string', required: false },
  },

  exits: {
    success: { description: 'Usuário criado com sucesso.' },
    conflict: { description: 'Login já existente.' },
    badRequest: { description: 'Erro ao registrar.' },
  },

  fn: async function (inputs, exits) {
    try {
      const existente = await Autenticacao.findOne({ login: inputs.login });
      if (existente) {
        return exits.conflict({ message: 'Login já cadastrado.' });
      }

      const senhaHash = await bcrypt.hash(inputs.senha, 10);

      const novaAuth = await Autenticacao.create({
        login: inputs.login,
        senha: senhaHash,
        role: inputs.role,
      }).fetch();

      let perfilCriado;
      if (inputs.role === 'motorista') {
        perfilCriado = await Motorista.create({
          nome: inputs.nome,
          contato: inputs.contato,
          cpf: inputs.cpf,
          autenticacao: novaAuth.id, // vínculo direto
        }).fetch();
      } else {
        perfilCriado = await Responsavel.create({
          nome: inputs.nome,
          contato: inputs.contato,
          cpf: inputs.cpf,
          autenticacao: novaAuth.id,
        }).fetch();
      }

      const token = jwt.sign(
        { id: novaAuth.id, role: novaAuth.role },
        process.env.JWT_SECRET || 'chave_super_segura',
        { expiresIn: '7d' }
      );

      return exits.success({
        message: 'Usuário registrado com sucesso!',
        autenticacao: {
          id: novaAuth.id,
          login: novaAuth.login,
          role: novaAuth.role,
        },
        perfil: perfilCriado,
        token,
      });

    } catch (err) {
      sails.log.error('Erro no registro:', err);
      return exits.badRequest({ message: 'Erro ao registrar usuário.' });
    }
  },
};