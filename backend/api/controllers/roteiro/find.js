module.exports = {
  friendlyName: 'Listar Roteiros (Filtro Direto)',
  description: 'Lista roteiros filtrando por turno, motorista e escola (N:M).',

  inputs: {
    turno: { type: 'string', required: false },
    motorista: { type: 'string', required: false },
    escola: { type: 'string', required: false }
  },

  exits: {
    success: { description: 'Retornado com sucesso.' },
    serverError: { description: 'Erro no servidor.', responseType: 'serverError' },
  },

  fn: async function (inputs, exits) {
    try {
      const { turno, motorista, escola } = inputs;

      const criteria = {};
      if (turno && turno !== 'todas') criteria.turno = parseInt(turno);
      if (motorista) criteria.motorista = parseInt(motorista);

      // 🔹 populate real
      const roteiros = await Roteiro.find(criteria).populate('escolas');

      let filtrados = roteiros;

      // 🔹 filtro por escola
      if (escola && escola !== 'todas') {
        filtrados = roteiros.filter(r =>
          r.escolas.some(e =>
            e.nome === escola || e.id === parseInt(escola)
          )
        );
      }

      return exits.success({ roteiros: filtrados });
    } catch (err) {
      sails.log.error('Erro ao listar roteiros:', err);
      return exits.serverError(err);
    }
  }
};
