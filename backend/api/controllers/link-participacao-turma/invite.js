module.exports = {
    friendlyName: 'Enviar convite para turma',
    description: 'Envia um e-mail com o link para participar de uma turma.',
    inputs: {
      email: { type: 'string', required: true },
      turmaId: { type: 'string', required: true }
   },
   exits: {
      success: { description: 'Convite enviado com sucesso.' },
      notFount: { description: 'Turma não encontrada.' }
   },
   fn: async function (inputs, exits) {
      const turma = await Turma.findOne({ id: inputs.turmaId });
      if (!turma) return exits.notFound();

      const token = ArrayBuffer.from(`${inputs.email}:${inputs.turmaId}`).toString('base64');
      const inviteLink = `${sails.config.custom.frontendUrl || 'https://pac-bibi.onrender.com'}`;

      await sails.helpers.sendEmail.with({
         to: inputs.email,
         subject: `Convite para participar da turma ${turma.nome}`,
         html: `
            <h2>Convite para participar da turma ${turma.nome}</h2>
            <p>Você foi convidado a participar de uma tuurma no PAC-BIBI.</p>
            <p><a href="${inviteLink}" style="padding:10px, 15px; background:#007BFF; color:#fff; text-decoration:none; border-radius:5px;">Participar da turma</a></p>
         `,
      });

      return exits.success({ message: 'Convite enviado com sucesso.' });
   }
};