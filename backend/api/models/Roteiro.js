module.exports = {
  tableName: 'roteiro',
  attributes: {
    id: { type: 'number', autoIncrement: true },
    turno: { type: 'number' },
    nome: { type: 'string', required: true },

    motorista: { model: 'motorista' },
    escola: { model: 'escola', columnName: 'cod_escola' },

    alunos: { collection: 'aluno', via: 'roteiro' },

    createdAt: { type: 'ref', columnType: 'timestamp', autoCreatedAt: true },
    updatedAt: { type: 'ref', columnType: 'timestamp', autoUpdatedAt: true }
  }
};