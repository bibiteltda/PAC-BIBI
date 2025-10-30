module.exports = {
   friendlyName: 'Criar turma',
   description: 'Cadastra uma nova turma no sistema',
   inputs: {
      nome: { type: 'string', required: true },
      ano: { type: 'string', required: true },
      turno: { type: 'string', required: true },
      capacidade: { type: 'number' },
      escola: { type: 'number', required: true }
   },
   exits: {
      success: { description: 'Turma criada com sucesso.' },
      invalid: { description: 'Erro ao cadastrar turma.'}
   },
   fn: async function (inputs, exits) {
      try {
         const turma = await Turma.create(inputs).fetch();
         return exits.success(turma);
      } catch (e) {
         sails.log.error('Erro ao criar turma:', e);
         return exits.invalid({ message: 'Erro ao cadastrar turma.' });
      }
   },
};