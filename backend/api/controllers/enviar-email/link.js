const crypto = require("crypto");

module.exports = {
  friendlyName: 'Enviar link de convite',

  inputs: {
    login: { type: 'string', required: true },
    turmaId: { type: 'number', required: true }
  },

  exits: {
    success: { description: 'Convite enviado.' },
    notFound: { description: 'Usuário não encontrado.' }
  },

  fn: async function (inputs, exits) {
    try {
      const { login, turmaId } = inputs;

      // Verificar se a turma existe
      const turma = await Roteiro.findOne({ id: turmaId });
      if (!turma) {
        return exits.notFound({ message: 'Turma não encontrada.' });
      }

      // Token de 32 bytes
      const token = crypto.randomBytes(32).toString("hex");

      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Expira em 24h

      // Salvar token no Autenticacao
      const usuario = await Autenticacao.findOne({ login });
      if (!usuario) {
        return exits.notFound({ message: "Usuário não encontrado." });
      }

      await Autenticacao.updateOne({ id: usuario.id }).set({
        inviteToken: token,
        inviteExpiresAt: expiresAt
      });

      const inviteUrl = `${process.env.FRONTEND_URL}/convite?token=${token}&turma=${turmaId}`;

      await sails.helpers.sendInvitation.with({
        email: usuario.login,
        url: inviteUrl
      });

      return exits.success({ message: "Convite enviado!" });

    } catch (error) {
      console.error(error);
      return exits.error(error);
    }
  }
};
