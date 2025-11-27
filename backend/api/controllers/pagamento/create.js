// Localização: api/controllers/pagamento/create.js

module.exports = {
  friendlyName: 'Criar pagamento',
  description: 'Cria um novo registro de pagamento.',
  inputs: {
    // Campos de valor e data
    valor: { type: 'number', columnType: 'real', required: true }, // Mudado para number
    dta_vcto: { type: 'string', columnType: 'date', required: true },
    dta_pgmt: { type: 'string', columnType: 'date', required: false },
    status: { type: 'string', required: true },
    
    // CAMPOS DE CHAVE ESTRANGEIRA (IDs) - DEVE SER number
    responsavel: { type: 'number', required: true }, 
    motorista: { type: 'number', required: true },
    aluno: { type: 'number', required: true } // <<< ESTE CAMPO É O ESSENCIAL
  },
  exits: { 
    success: { description: 'Criado com sucesso.' }, 
    badRequest: { description: 'Erro ao criar.', responseType: 'badRequest' } // Adicionado responseType
  },
  fn: async function (inputs, exits) {
    try {
      // O Sails pega apenas os campos listados em 'inputs' e cria o objeto
      const novo = await Pagamento.create(inputs).fetch(); 

      // É bom buscar o objeto completo, populado, para retornar (opcional, mas bom para checagem)
      const pagamentoPopulado = await Pagamento.findOne(novo.id)
        .populate('responsavel')
        .populate('motorista')
        .populate('aluno');
      
      return exits.success({ 
        message: 'Pagamento criado com sucesso!', 
        pagamento: pagamentoPopulado 
      });
      
    } catch (err) {
      sails.log.error('Erro ao criar pagamento:', err);
      // Retorna o erro detalhado para ajudar no debug do Postman
      return exits.badRequest({ message: 'Erro ao criar pagamento.', error: err.message });
    }
  }
};