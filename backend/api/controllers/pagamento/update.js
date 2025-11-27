module.exports = {
  friendlyName: 'Atualizar pagamento',
  description: 'Atualiza um pagamento existente.',

  inputs: {
    id: { type: 'number', required: true },
    
    // Tipagem mais específica para consistência com o banco
    valor: { type: 'number', columnType: 'real', required: false },
    dta_vcto: { type: 'string', columnType: 'date', required: false },
    dta_pgmt: { type: 'string', columnType: 'date', required: false },
    status: { type: 'string', required: false },

    // Relacionamentos corretos
    responsavel: { type: 'number', required: false },
    motorista: { type: 'number', required: false },
    aluno: { type: 'number', required: false }
  },

  exits: {
    success: { description: 'Atualizado com sucesso.' },
    notFound: { description: 'Não encontrado.', responseType: 'notFound' },
    serverError: { description: 'Erro interno no servidor.', responseType: 'serverError' } // Adicionar para tratamento de catch
  },

  fn: async function (inputs, exits) {
    try {
      const id = inputs.id;
      
      // Cria um novo objeto para o set() sem o ID (boa prática de segurança)
      const updateData = {...inputs}; 
      delete updateData.id;

      const atualizado = await Pagamento.updateOne({ id }).set(updateData);

      if (!atualizado) {
        return exits.notFound({ message: 'Pagamento não encontrado.' });
      }

      return exits.success({
        message: 'Pagamento atualizado com sucesso!',
        data: atualizado
      });

    } catch (err) {
      sails.log.error('Erro ao atualizar pagamento:', err);
      // Usa o exit explícito para o erro interno
      return exits.serverError({ message: 'Erro interno ao atualizar pagamento.', error: err.message });
    }
  }
};