/**
 * Pagamento.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Pagamento',
  primaryKey: 'id_pagamento',
  attributes: {
    id_pagamento: { type: 'number', autoIncrement: true },
    valor: { type: 'number', required: true },
    dta_vcto: { type: 'ref', columnType: 'datetime' },
    dta_pgmt: { type: 'ref', columnType: 'datetime' },
    status: { type: 'string' },
    responsavel: { model: 'responsavel', required: true },
    motorista: { model: 'motorista', required: true }
  }
};