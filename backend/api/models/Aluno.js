module.exports = {
  tableName: 'aluno',
  autoCreatedAt: true,
  autoUpdatedAt: true,
  
  attributes: {
    nome: { type: 'string', required: true, maxLength: 80 },
    idade: { type: 'number', required: true }, 

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