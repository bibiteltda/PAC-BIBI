const sgMail = require('@sendgrid/mail');
const Autenticacao = require('../../models/Autenticacao');

module.exports = {
  friendlyName: 'Enviar código',
  description: 'Envia um código de verificação por e-mail usando SendGrid.',

  inputs: {
    email: { type: 'string', required: true, description: 'E-mail do usuário para enviar o código de verificação.' },
  },
  exits: {
    success: { description: 'Código enviado com sucesso.' },
    notFound: { description: 'Usuário não encontrado com este e-mail.' },
    serverError: { description: 'Erro ao enviar o código.' },
  },
  fn: async function (inputs, exits) {
    try {
      const { email } = inputs;

      const usuario = await Autenticacao.findOne({ login: email });
      if (!usuario) {
        return exits.notFound({ message: 'Usuário não encontrado.' });
      }

      const code = Math.floor(1000 + Math.random() * 9000).toString();

      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
      await Autenticacao.updateOne({ id: usuario.id }).set({
        resetCode: code,
        resetCodeExpiresAt: expiresAt
      });

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: email,
        from: process.env.EMAIL_FROM,
        subject: 'Código de verificação',
        text: `Seu código de verificação é: ${code}`,
        html: `
          <h2>Verificação de Conta</h2>
          <p>Olá,</p>
          <p>Seu código de verificação é: <strong>${code}</strong></p>
          <p>Ele expira em 5 minutos.</p>
        `,
      };

      await sgMail.send(msg);

      return exits.success({ message: 'Código enviado com sucesso.' });
    } catch (error) {
      sails.log.error('Erro ao enviar código de verificação:', error);
      return exits.serverError({ message: 'Erro ao enviar o código.' });
    }
  }
};
