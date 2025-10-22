import crypto from 'crypto';
import Responsavel from '../../models/Responsavel';

module.exports = {
   friendlyName: 'Recover password',
   description: 'Envia link de recuperação de senha para o e-mail informado',
   inputs: {
      email: { type: 'string', required: true },
   },
   exits: {
      success: { description: 'E-mail enviado com sucesso.' },
      notFound: { description: 'Usuário não encontrado.' },
   },
   fn: async function (inputs, exits) {
      const { email } = inputs;

      const user = await Responsavel.findOne({ email });
      if (!user) {
         return exits.notFound({ error: 'Usuário não encontrado.' });
      }

      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = Date.now() + 1000 * 60 * 15; // 15 minutos

      await Responsavel.updateOne({ id: user.id }).set({
         resetToken: token,
         resetTokenExpires: expiresAt,
      });

      const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

      const html = `
      <p>Olá, ${user.nome || 'usuário'} 👋</p>
      <p>Você solicitou a redefinição de senha.</p>
      <p>Clique no link abaixo para criar uma nova senha (válido por 15 minutos):</p>
      <a href="${link}">${link}</a>
      <p>Se você não fez essa solicitação, ignore este e-mail.</p>
    `;

    await sails.helpers.sendEmail.with({
      to: email,
      subject: 'Recuperação de senha - BIBI',
      html,
    });

    return exits.success({ message: 'Link de recuperação de senha enviado.' });
   },
};