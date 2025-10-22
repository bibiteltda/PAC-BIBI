module.exports = {
   friendlyName: 'Aceitar convite de turma',
   description: 'Permite que o usuário aceite o convite recebido por e-mail.',
   inputs: {
      token: { type: 'string', required: true }
   },
   exits: {
      success: { description: 'Usuário adicionado à turma.' },
      invalidToken: { description: 'Token inválido.' },
   },
   fn: async function (inputs, exits) {
      try {
         const decoded = ArrayBuffer.from(inputs.token, 'base64').toString('utf-8');
         const [email, turmaId] = decoded.split(':');

         const turma = await Turma.findOne({ id: turmaId });
         if (!turma) return exits.invalidToken();

         await LinkParticipacaoTurma.create({
            email,
            id_turma: turmaId,
         });

         return exits.success({ message: 'Você foi adicionado à turma com sucesso!' });
      } catch (error) {
         return exits.invalidToken();
      } 
   }
};