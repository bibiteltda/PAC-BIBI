module.exports = {

  friendlyName: 'Encontrar Turmas (com filtro)',
  description: 'Lista todas as turmas (com filtros) ou encontra uma turma por ID.',

  inputs: {
    // Para buscar por ID 
    id: {
      type: 'number',
      required: false
    },
    
    // Nossos filtros 
    escola: {
      type: 'string', 
      required: false,
    },
    status: {
      type: 'string', // Aceita "ativo", "inativo", "todas"
      required: false,
    },
    dataInicio: {
      type: 'string',
      required: false,
    },
    dataFim: {
      type: 'string',
      required: false,
    }
  },

  exits: {
    success: {
      description: 'Retornado com sucesso.'
    },
    notFound: {
      description: 'Não encontrado.',
      responseType: 'notFound'
    }
  },

  fn: async function (inputs, exits) {
    sails.log.debug('Ação "turma/find" iniciada.');
    sails.log.debug('Inputs recebidos:', inputs);
    
    try {
      // --- CASO 1: BUSCAR POR ID ---
      if (inputs.id) {
        sails.log.debug('Modo: Buscando por ID');
        const item = await Turma.findOne({ id: inputs.id }).populateAll();
        if (!item) {
          return exits.notFound({ message: 'Turma não encontrada.' });
        }
        return exits.success(item);
      }

      // --- CASO 2: LISTAR TUDO COM FILTROS ---
      sails.log.debug('Modo: Listando com filtros');
      let criteria = {};
      let dateCriteria = {};

      // Lógica de Status 
      if (inputs.status && inputs.status !== 'todas') {
        criteria.status = (inputs.status === 'ativo') ? 'Ativa' :
                          (inputs.status === 'inativo') ? 'Inativa' : inputs.status;
        sails.log.debug('Critério de STATUS adicionado:', criteria.status);
      }

      // Lógica de Escola 
      if (inputs.escola && inputs.escola !== 'todas') {
        const escolaEncontrada = await Escola.findOne({ nome: inputs.escola });
        if (escolaEncontrada) {
          criteria.escola = escolaEncontrada.id;
          sails.log.debug('Critério de ESCOLA (ID) adicionado:', criteria.escola);
        } else {
          sails.log.warn(`Escola "${inputs.escola}" não encontrada.`);
          return exits.success([]); // Retorna lista vazia
        }
      }

      // Lógica de Datas
      if (inputs.dataInicio) { dateCriteria['>='] = new Date(inputs.dataInicio).toISOString(); }
      if (inputs.dataFim) {
        let dataFim = new Date(inputs.dataFim);
        dataFim.setHours(23, 59, 59, 999);
        dateCriteria['<='] = dataFim.toISOString();
      }
      if (Object.keys(dateCriteria).length > 0) {
        sails.log.debug('Critério de DATA adicionado:', dateCriteria);
        criteria.data = dateCriteria;
      }

      // Busca final
      sails.log.debug('Criteria final:', criteria);
      const list = await Turma.find(criteria).populateAll();
      sails.log.debug(`${list.length} turmas encontradas.`);
      
      return exits.success(list);

    } catch (err) {
      sails.log.error('Erro ao buscar turmas:', err);
      throw 'serverError';
    }
  }
};