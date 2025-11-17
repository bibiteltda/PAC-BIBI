const fetch = require("node-fetch");

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
    const mailData = {
      sender: { name: "BiBi", email: process.env.EMAIL_FROM },
      to: [{ email: inputs.email }],
      subject: "Código de verificação",
      htmlContent: `
        <div style="font-family: Arial; font-size: 16px;">
          <p>Seu código de verificação é:</p>
          <h2 style="color:#4CAF50;">${inputs.code}</h2>
        </div>
      `,
    };

    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.PASSWORD_FROM,
        },
        body: JSON.stringify(mailData),
      });

      const data = await response.json();

      if (!response.ok) {
        return exits.error(data);
      }

      return exits.success(data);
    } catch (err) {
      return exits.error(err);
    }
  }
}
