module.exports = {
  friendlyName: 'Verificar código',
  description: 'Verifica o código de verificação enviado por e-mail.',

  inputs: {
    email: { type: 'string', required: true },
    code: { type: 'string', required: true },
  },

  exits: {
    success: { description: 'Código verificado com sucesso.' },
    badRequest: { description: 'Código inválido ou expirado.' },
    serverError: { description: 'Erro interno.' },
  },

  fn: async function (inputs, exits) {
    try {
      const { email, code } = inputs;

      const usuario = await Autenticacao.findOne({ email });

      if (!usuario) {
        return exits.badRequest({ message: 'Usuário não encontrado.' });
      }

      if (!usuario.resetCode || usuario.resetCode !== code) {
        return exits.badRequest({ message: 'Código inválido.' });
      }

      if (new Date(usuario.resetCodeExpiresAt) < new Date()) {
        return exits.badRequest({ message: 'Código expirado.' });
      }

      await Autenticacao.updateOne({ id: usuario.id }).set({
        resetCode: null,
        resetCodeExpiresAt: null
      });

      return exits.success({ message: 'Código verificado com sucesso.' });

    } catch (error) {
      sails.log.error('Erro ao verificar código:', error);
      return exits.serverError({ message: 'Erro ao verificar o código.' });
    }
  },
};
