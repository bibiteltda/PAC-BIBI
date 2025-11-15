const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = {
  enviarCodigo: async (email, code) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Seu código de verificação',
        html: `
          <div style="font-family: Arial; font-size: 16px;">
            <p>Olá!</p>
            <p>Seu código de verificação é:</p>
            <h2 style="color:#4CAF50; margin: 0;">${code}</h2>
            <p>O código expira em 10 minutos.</p>
          </div>
        `
      };

      const info = await transporter.sendMail(mailOptions);

      console.log(`Código enviado para ${email} - ID: ${info.messageId}`);
      return info;

    } catch (error) {
      console.error('Erro ao enviar código:', error);
      throw error;
    }
  }
};
