module.exports = {
  tableName: 'aluno',
  
  attributes: {
    id: { type: 'number', autoIncrement: true },
    nome: { type: 'string', required: true, maxLength: 80 },
    idade: { type: 'number', required: true }, 

    responsavel: { model: 'responsavel', required: true },
    escola: { model: 'escola', required: true },
    motorista: { model: 'motorista', required: true },
    roteiro: { model: 'roteiro', required: true },

    pagamentos: { collection: 'pagamento', via: 'aluno' },

    createdAt: { type: 'ref', columnType: 'timestamp without time zone', autoCreatedAt: true },
    updatedAt: { type: 'ref', columnType: 'timestamp without time zone', autoUpdatedAt: true }
  },
};