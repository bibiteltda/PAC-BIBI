module.exports = {
  friendlyName: 'Enviar link de convite',

  inputs: {
    email: { type: 'string', required: true },
    url: { type: 'string', required: true }
  },

  fn: async function(inputs, exits) {
    const mailData = {
      sender: { name: "BiBi", email: process.env.EMAIL_FROM },
      to: [{ email: inputs.email }],
      subject: "Convite para participar da turma",
      htmlContent: `
        <h3>Você foi convidado para participar de uma turma.</h3>
        <p>Clique abaixo para confirmar:</p>
        <p><a href="${inputs.url}">Confirmar participação</a></p>
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
        console.error("Erro Brevo:", response.status, data);
        return exits.error(new Error("Falha ao enviar e-mail"));
      }

      return exits.success(data);
    } catch (err) {
      return exits.error(err);
    }
  }
}
