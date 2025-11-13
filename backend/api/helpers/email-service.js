const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
   async sendEmail(to, subject, text, html) {
      try {
         const msg = {
            to,
            from: process.env.EMAIL_FROM,
            subject,
            html: html,
         };
         await sgMail.send(msg);
         sails.log.info(`Email enviado para ${to}`);
         return true;
      } catch (e) {
         sails.log.error('Erro ao envial email: ', e);
         throw new Error('Falha ao enviar email');
      }
   },

   async sendVerificationCode(email, purpose) {
      const code = Math.floor()
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await EmailVerification.create({ email, code, purpose, expiresAt });

      const html = `
         <h2>Código de verificação</h2>
         <p>Use o código abaixo para continuar:</p>
         <h3>${code}</h3>
         <p>Este código expira em 10 minutos.</p>
      `;

      await this.sendEmail(email, 'Código de verificação', html);
      return code;
   },

   async verifyCode(login, code) {
      const user  = await Autenticacao.findOne({ login });
      if (!user) throw new Error('Usuário não encontrado');

      if (!user,resetCode || user.resetCode !== code) {
         throw new Error('Código de verificação inválido');
      }
      if (new Date(user.resetCodeExpiresAt) < new Date()) {
         throw new Error('Código expirado');
      }

      await Autenticacao.updateOne({ id: user.id }).set({
         resetCOde: null,
         resetCodeExpiresAt: null
      });

      return true;
   }
};