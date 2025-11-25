module.exports = {
  friendlyName: 'Enviar código',
  description: 'Enviar um código de verificação para um e-mail.',

  inputs: {
    login: { type: 'string', required: true } // email
  },

  exits: {
    success: { description: 'Código enviado com sucesso.' },
    notFound: { description: 'Usuário não encontrado.' }
  },

  fn: async function (inputs, exits) {
    try {
      const { login } = inputs;

      // Verificar se existe usuário
      const usuario = await Autenticacao.findOne({ login });
      if (!usuario) {
        return exits.notFound({ message: 'Usuário não encontrado.' });
      }

      const code = Math.floor(1000 + Math.random() * 9000).toString();

      await Autenticacao.updateOne({ id: usuario.id }).set({
        resetCode: code,
        resetCodeExpiresAt: new Date(Date.now() + 5 * 60 * 1000) // expira em 5 minutos
      });
      
      await sails.helpers.sendCode.with({
        email: usuario.login,
        code,
      });

      return exits.success({
        message: 'Código enviado com sucesso!',
      });

    } catch (error) {
      console.error(error);
      return exits.error(error);
    }
  }
};
