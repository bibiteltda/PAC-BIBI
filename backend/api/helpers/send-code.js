const nodemailer = require('nodemailer');

module.exports = {
  friendlyName: 'Enviar código',
  description: 'Envia um código de verificação por e-mail.',

  inputs: {
    email: { type: 'string', required: true },
    code:  { type: 'string', required: true }
  },
  exits: {
    success: {
      description: 'Email enviado com sucesso.'
    }
  },

  fn: async function (inputs, exits) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bibiteltda@gmail.com',
        pass: 'xqov hrwp nfws fmtn',
      },
    });

    const mailOptions = {
      from: 'bibiteltda@gmail.com',
      to: inputs.email,
      subject: 'Seu código de verificação',
      html: `
        <div style="font-family: Arial; font-size: 16px;">
          <p>Seu código de verificação é:</p>
          <h2 style="color:#4CAF50;">${inputs.code}</h2>
        </div>
      `
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      return exits.success(info);
    } catch (err) {
      return exits.error(err);
    }
  }
};
