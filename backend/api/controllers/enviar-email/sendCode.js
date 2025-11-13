const nodemailer = require('nodemailer');

module.exports = {
  friendlyName: 'Enviar código',
  description: 'Envia um código de verificação por e-mail.',

  inputs: {
    email: { type: 'string', required: true, description: 'E-mail do usuário para enviar o código.' },
  },
  exits: {
    success: { description: 'Código enviado com sucesso.' },
    serverError: { description: 'Erro ao enviar o código.' },
  },
  fn: async function (inputs, exits) {
    try {
      const { email } = inputs;
      const code = Math.floor(1000 + Math.random() * 9000).toString();

      await sails.helpers.cache.set(`verifyCode:${email}`, code, 300); // Código válido por 5 minutos

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Suporte" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Código de verificação',
        text: `Seu código é: ${code}`,
      });

      return exits.success({ message: 'Código enviado com sucesso.' });
    } catch (error) {
      sails.log.error('Erro ao enviar código:', error);
      return exits.serverError({ message: 'Erro ao enviar o código.' });
    }
  },
};