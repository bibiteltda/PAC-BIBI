module.exports = {
  friendlyName: 'Criar aluno',
  description: 'Cria um novo registro de aluno com validação de integridade.',

  inputs: {
    nome: { type: 'string', required: true },
    idade: { type: 'number', required: true },
    responsavel: { type: 'number', required: true }, 
    escola: { type: 'number', required: true },     
    motorista: { type: 'number', required: true },  
    roteiro: { type: 'number', required: true }     
  },

  exits: {
    success: {
      description: 'Aluno criado com sucesso.'
    },
    badRequest: {
      description: 'Erro de validação ou dados inválidos.',
      responseType: 'badRequest' // Sails envia status 400
    },
    // Exits específicos para os modelos existentes
    responsavelNotFound: { description: 'Responsável não encontrado.', responseType: 'notFound' },
    escolaNotFound: { description: 'Escola não encontrada.', responseType: 'notFound' },
    motoristaNotFound: { description: 'Motorista não encontrado.', responseType: 'notFound' },
    roteiroNotFound: { description: 'Roteiro não encontrado.', responseType: 'notFound' },
    serverError: {
      description: 'Erro inesperado no servidor.',
      responseType: 'serverError' // Sails envia status 500
    }
  },

  fn: async function (inputs, exits) {
    sails.log.info('Iniciando action aluno/create...');
    sails.log.debug('Dados recebidos:', inputs);

    try {
      sails.log.debug('Validando existência de IDs relacionados...');

      // 1. Validação de integridade 
      const [resp, esc, mot, rot] = await Promise.all([
        Responsavel.findOne({ id: inputs.responsavel }),
        Escola.findOne({ id: inputs.escola }),
        Motorista.findOne({ id: inputs.motorista }),
        Roteiro.findOne({ id: inputs.roteiro }),
      ]).catch(dbErr => {
          sails.log.error('Erro ao buscar registros relacionados:', dbErr);
          throw dbErr;
      });

      sails.log.debug('Resultados da validação:', {
        responsavelEncontrado: !!resp,
        escolaEncontrada: !!esc,
        motoristaEncontrado: !!mot,
        roteiroEncontrado: !!rot
      });

      // 2. Verifica cada resultado 
      if (!resp) {
        sails.log.warn(`Falha na validação: Responsável ${inputs.responsavel} não encontrado.`);
        return exits.responsavelNotFound(`O responsável com ID ${inputs.responsavel} não foi encontrado.`);
      }
      if (!esc) {
        sails.log.warn(`Falha na validação: Escola ${inputs.escola} não encontrada.`);
        return exits.escolaNotFound(`A escola com ID ${inputs.escola} não foi encontrada.`);
      }
      if (!mot) {
        sails.log.warn(`Falha na validação: Motorista ${inputs.motorista} não encontrado.`);
        return exits.motoristaNotFound(`O motorista com ID ${inputs.motorista} não foi encontrado.`);
      }
      if (!rot) {
        sails.log.warn(`Falha na validação: Roteiro ${inputs.roteiro} não encontrado.`);
        return exits.roteiroNotFound(`O roteiro com ID ${inputs.roteiro} não foi encontrado.`);
      }

      sails.log.debug('Validações de ID passaram. Tentando criar Aluno...');

      // 3. Cria o aluno 
      const novoAluno = await Aluno.create(inputs).fetch().catch(createErr => {
          sails.log.error('Erro ao executar Aluno.create:', createErr);
          throw createErr;
      });

      sails.log.info('Aluno criado com sucesso:', novoAluno.id);

      // 4. Retorna o sucesso
      return exits.success(novoAluno);

    } catch (err) {
      sails.log.error('Erro geral na action aluno/create:', err);
      return exits.serverError(err);
    }
  }
};