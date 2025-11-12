module.exports = {
  tableName: 'pagamento',
  attributes: {
    id: { type: 'number', autoIncrement: true },
    valor: { type: 'number', columnType: 'real' },
    dta_vcto: { type: 'ref', columnType: 'date' },
    dta_pgmt: { type: 'ref', columnType: 'date' },
    status: { type: 'string' },

    responsavel: { model: 'responsavel' },
    motorista: { model: 'motorista' },
    aluno: { model: 'aluno' },

    createdAt: { type: 'ref', columnType: 'timestamp without time zone', autoCreatedAt: true },
    updatedAt: { type: 'ref', columnType: 'timestamp without time zone', autoUpdatedAt: true }
  }
};
