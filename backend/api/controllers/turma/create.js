module.exports = {
   friendlyName: 'Criar turma',
   description: 'Cadastra uma nova turma no sistema',
   inputs: {
    turno: { type: 'number', required: true },
    motorista: { type: 'number', required: true },
    escolas: { type: 'json', defaultsTo: [] },
    alunos: { type: 'json', defaultsTo: [] },
  },
   exits: {
      success: { description: 'Turma criada com sucesso.' },
      invalid: { description: 'Erro ao cadastrar turma.'}
   },
   fn: async function (inputs, exits) {
      try {
         const roteiro = await Roteiro.create({
         turno: inputs.turno,
         motorista: inputs.motorista,
         escolas: inputs.escolas,
         alunos: inputs.alunos,
      }).fetch();

         return exits.success(roteiro);
      } catch (e) {
         sails.log.error('Erro ao criar turma:', e);
         return exits.invalid({ message: 'Erro ao cadastrar turma.' });
      }
   },
};