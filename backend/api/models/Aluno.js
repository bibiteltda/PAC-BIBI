module.exports = {
  tableName: 'aluno',
  attributes: {
    // ID é gerenciado pelo Sails/Waterline

    nome: { type: 'string', required: true, maxLength: 80 },
    idade: { type: 'number', required: true }, 

    // --- Relacionamentos ---
    responsavel: {
      model: 'responsavel',
      required: true
    },
    escola: {
      model: 'escola',
      required: true
    },
    motorista: {
      model: 'motorista',
      required: true
    },
    roteiro: {
      model: 'roteiro',
      required: true
    }
  },
};