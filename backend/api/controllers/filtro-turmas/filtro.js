module.exports = {

  friendlyName: 'Filtrar turmas (Backend Inteligente)',

  description: 'Lista turmas com base em filtros de escola (nome), status (string) e data.',

  inputs: {
    // 1. CORREÇÃO: Mudar para 'string' para aceitar o NOME da escola
    escola: {
      type: 'string', // Era 'number'
      required: false,
      description: 'O NOME da escola para filtrar.'
    },

    status: {
      type: 'string',
      required: false,
      description: 'O status da turma (ex: "ativo", "inativo", "todas").'
    },

    dataInicio: {
      type: 'string',
      required: false,
      description: 'Data inicial do filtro (formato YYYY-MM-DD).'
    },

    dataFim: {
      type: 'string',
      required: false,
      description: 'Data final do filtro (formato YYYY-MM-DD).'
    }
  },

  exits: {
    success: {
      description: 'Turmas filtradas retornadas com sucesso.'
    },
  },

  fn: async function (inputs, exits) {
    sails.log.debug('Ação "filtro-turmas/filtro" iniciada.');
    sails.log.debug('Inputs recebidos do frontend:', inputs);

    try {
      let criteria = {};
      let dateCriteria = {};

      // --- 2. LÓGICA DO STATUS (Ignora "todas" e "traduz") ---
      if (inputs.status && inputs.status !== 'todas') {
        // "Tradução" do valor do frontend para o valor do banco
        if (inputs.status === 'ativo') {
          criteria.status = 'Ativa'; // <-- Altere se o valor no seu banco for diferente
        } else if (inputs.status === 'inativo') {
          criteria.status = 'Inativa'; // <-- Altere se o valor no seu banco for diferente
        } else {
          criteria.status = inputs.status; // Aceita outros status
        }
        sails.log.debug('Critério de STATUS adicionado:', criteria.status);
      }

      // --- 3. LÓGICA DA ESCOLA (Ignora "todas" e busca pelo NOME) ---
      if (inputs.escola && inputs.escola !== 'todas') {
        // Precisamos buscar o ID da escola usando o nome que o frontend enviou
        sails.log.debug(`Buscando ID da escola com nome: "${inputs.escola}"`);
        
        // (Assume que seu modelo Escola.js tem um campo 'nome')
        const escolaEncontrada = await Escola.findOne({ nome: inputs.escola });

        if (escolaEncontrada) {
          // Achamos a escola! Adiciona o ID dela no critério de Turma.
          criteria.escola = escolaEncontrada.id;
          sails.log.debug('Critério de ESCOLA (ID) adicionado:', criteria.escola);
        } else {
          // O frontend enviou um nome de escola que não existe.
          // Não adianta continuar, nenhuma turma será encontrada.
          sails.log.warn(`Escola com nome "${inputs.escola}" não encontrada.`);
          return exits.success([]); // Retorna uma lista vazia
        }
      }

      // --- LÓGICA DAS DATAS (continua igual) ---
      if (inputs.dataInicio) {
        dateCriteria['>='] = new Date(inputs.dataInicio).toISOString();
      }
      if (inputs.dataFim) {
        let dataFim = new Date(inputs.dataFim);
        dataFim.setHours(23, 59, 59, 999);
        dateCriteria['<='] = dataFim.toISOString();
      }
      if (Object.keys(dateCriteria).length > 0) {
        sails.log.debug('Critério de DATA adicionado:', dateCriteria);
        criteria.data = dateCriteria;
      }

      // --- BUSCA FINAL ---
      sails.log.debug('Objeto "criteria" final enviado para o .find():', criteria);
      const turmas = await Turma.find(criteria).populateAll();
      sails.log.debug(`Busca concluída. ${turmas.length} turmas encontradas.`);

      return exits.success(turmas);

    } catch (err) {
      sails.log.error('Erro grave ao filtrar turmas:', err);
      throw 'serverError';
    }
  }
};