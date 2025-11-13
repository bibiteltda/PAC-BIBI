module.exports = {
  friendlyName: 'Listar Roteiros (Filtro Direto)',
  description: 'Lista roteiros filtrando apenas por "escola" (N:M) e "turno" (número).',

  inputs: {
    // 1. Filtro de Escola
    escola: {
      type: 'string',
      required: false,
      description: 'Filtra por um ID de escola específico.',
    },
    
    // 2. Filtro de Turno
    turno: {
      type: 'string',
      required: false,
      description: 'Filtra por um número de turno específico.',
    },
  },

  exits: {
    success: { description: 'Retornado com sucesso.' },
    serverError: { description: 'Erro no servidor.', responseType: 'serverError' },
  },

  fn: async function (inputs, exits) {
    try {
      // 1. O objeto de 'criteria' (filtros) começa vazio
      let criteria = {};

      //  FILTRO DE ESCOLA (N:M) 
      if (inputs.escola && inputs.escola !== 'todas') {
        criteria.escolas = inputs.escola;
      }

      // === FILTRO DE TURNO (Número) ===
      if (inputs.turno && inputs.turno !== 'todas') {
        // O Waterline vai converter a string "1" para o número 1
        // para bater com o models ('turno: { type: 'number' }')
        criteria.turno = inputs.turno;
      }
      // 2. Executa a busca com os filtros
      sails.log.info('Filtrando Roteiros com os critérios (diretos):', criteria);

      const list = await Roteiro.find(criteria)
                                .populate('escolas'); 

      return exits.success(list);

    } catch (err) {
      sails.log.error('Erro ao listar roteiro:', err);
      return exits.serverError(err);
    }
  },
};