const crypto = require('crypto');

module.exports = {
  friendlyName: 'Enviar link de verificação',
  description: 'Enviar um link de verificação para um e-mail.',

  inputs: {
    login: { type: 'string', required: true }, // email
  },

  exits: {
    success: { description: 'Link enviado com sucesso.' },
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

      const token = crypto.randomBytes(32).toString('hex');

      await Autenticacao.updateOne({ id: usuario.id }).set({
        resetToken: token,
        resetTokenExpiresAt: new Date(Date.now() + 10 * 60 * 1000) // expira em 10 minutos
      });

      // Montar link (troque a URL pelo seu frontend real)
      const link = `https://seusite.com/reset/${token}`;

      // Enviar e-mail
      await sails.helpers.sendEmail.with({
        email: usuario.login,
        subject: 'Recuperação de senha',
        message: `Clique no link para continuar: ${link}`
      });

      return exits.success({
        message: 'Link enviado com sucesso!',
      });

    } catch (error) {
      console.error(error);
      return exits.error(error);
    }
  }
};
