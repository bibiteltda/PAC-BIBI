module.exports = {
  tableName: 'aluno',
  autoCreatedAt: true,
  autoUpdatedAt: true,
  
  attributes: {
    id: { type: 'number', autoIncrement: true },
    nome: { type: 'string', required: true, maxLength: 80 },
    idade: { type: 'number' },

    responsavel: { model: 'responsavel' },
    escola: { model: 'escola' },
    motorista: { model: 'motorista' },
    roteiro: { model: 'roteiro' },

    createdAt: { type: 'ref', columnType: 'timestamp without time zone', autoCreatedAt: true },
    updatedAt: { type: 'ref', columnType: 'timestamp without time zone', autoUpdatedAt: true }
  }
};
