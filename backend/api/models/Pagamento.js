module.exports = {
  tableName: 'pagamento',
  attributes: {
    id: { type: 'number', columnName: 'id_pagamento', autoIncrement: true },
    valor: { type: 'number', columnType: 'real' },
    dta_vcto: { type: 'ref', columnType: 'date' },
    dta_pgmt: { type: 'ref', columnType: 'date' },
    status: { type: 'string' },

    responsavel: { model: 'responsavel' },
    motorista: { model: 'motorista' },

    createdAt: { type: 'ref', columnType: 'timestamp without time zone', autoCreatedAt: true },
    updatedAt: { type: 'ref', columnType: 'timestamp without time zone', autoUpdatedAt: true }
  }
};
