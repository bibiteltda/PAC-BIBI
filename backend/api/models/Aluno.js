module.exports = {
  tableName: 'aluno',
  attributes: {
    id: { type: 'number', columnName: 'id_aluno', autoIncrement: true },
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
