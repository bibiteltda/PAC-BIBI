const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Login',
  description: 'Autentica e retorna dados do usuário vinculado.',

  inputs: {
    login: { type: 'string', required: true },
    senha: { type: 'string', required: true },
  },

  exits: {
    success: { description: 'Login realizado com sucesso.' },
    notFound: { description: 'Usuário não encontrado.' },
    badRequest: { description: 'Senha incorreta.' },
  },

  fn: async function (inputs, exits) {
    try {
      const conta = await Autenticacao.findOne({ login: inputs.login })
        .populate('motorista')
        .populate('responsavel');

      if (!conta) {
        return exits.notFound({ message: 'Usuário não encontrado.' });
      }

      const senhaOk = await bcrypt.compare(inputs.senha, conta.senha);
      if (!senhaOk) {
        return exits.badRequest({ message: 'Senha incorreta.' });
      }

      const token = jwt.sign(
        { id: conta.id, role: conta.role },
        process.env.JWT_SECRET || 'chave_super_segura',
        { expiresIn: '7d' }
      );

      let perfil = null;
      if (conta.role === 'motorista' && conta.motorista.length > 0) {
        perfil = conta.motorista[0];
      } else if (conta.role === 'responsavel' && conta.responsavel.length > 0) {
        perfil = conta.responsavel[0];
      }

      return exits.success({
        message: 'Login realizado com sucesso!',
        token,
        autenticacao: {
          id: conta.id,
          login: conta.login,
          role: conta.role,
        },
        perfil,
      });

    } catch (err) {
      sails.log.error('Erro no login:', err);
      return exits.badRequest({ message: 'Erro no login.' });
    }
  },
};
