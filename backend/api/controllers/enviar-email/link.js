const crypto = require("crypto");

module.exports = {
  friendlyName: 'Enviar link de convite',

  inputs: {
    login: { type: 'string', required: true },
    turmaId: { type: 'number', required: true }
  },

  exits: {
    success: { description: 'Convite enviado.' },
    notFound: { description: 'Usuário ou responsável não encontrado.' }
  },

  fn: async function (inputs, exits) {
    try {
      const { login, turmaId } = inputs;

      // Verificar se a turma existe
      const turma = await Roteiro.findOne({ id: turmaId });
      if (!turma) {
        return exits.notFound({ message: 'Turma não encontrada.' });
      }

      // Verificar se o usuário existe
      const usuario = await Autenticacao.findOne({ login });
      if (!usuario) {
        return exits.notFound({ message: "Usuário não encontrado." });
      }

      // Verificar se esse usuário é um responsável
      const responsavel = await Responsavel.findOne({ autenticacao: usuario.id });

      if (!responsavel) {
        return exits.notFound({
          message: "Este usuário não é um responsável e não pode receber convite."
        });
      }

      // Evitar envio duplicado de convite válido
      if (usuario.inviteToken && usuario.inviteExpiresAt > new Date()) {
        return exits.success({
          message: "Convite já foi enviado e ainda está válido.",
          aindaValidoAte: usuario.inviteExpiresAt
        });
      }

      // Gerar token e preparar expiração
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

      // Salvar token, expiração e turma vinculada
      await Autenticacao.updateOne({ id: usuario.id }).set({
        inviteToken: token,
        inviteExpiresAt: expiresAt,
        inviteTurma: turmaId // 🔥 agora a turma fica registrada no banco
      });

      // Criar URL segura (turma será ignorada no frontend, só token importa)
      const inviteUrl = `${process.env.FRONTEND_URL}/convite?token=${token}`;

      // Enviar email
      await sails.helpers.sendInvitation.with({
        email: usuario.login,
        url: inviteUrl
      });

      return exits.success({
        message: "Convite enviado com sucesso!",
        conviteExpiraEm: expiresAt
      });

    } catch (error) {
      console.error(error);
      return exits.error(error);
    }
  }
};
