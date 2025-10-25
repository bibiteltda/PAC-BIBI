const sgMail = require('@sendgrid/mail');

module.exports = {
   friendlyName: 'Send email',
   description: 'Envia e-mails usando SendGrid API',
   inputs: {
      to: { type: 'string', required: true },
      subject: { type: 'string', required: true },
      html: { type: 'string', required: true },
   },

   fn: async function (inputs) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
         to: inputs.to,
         from: process.env.SENDGRID_FROM || 'bibiteltda@gmail.com',
         subject: inputs.subject,
         html: inputs.html,
      };

      try {
         await sgMail.send(msg);
         sails.log.info(`E-mail enviado para ${inputs.to}`);
         return true;
      } catch (err) {
         sails.log.error('Erro ao enviar e-mail:', err);
         throw new Error('Falha ao enviar o e-mail');
      }
   },
};