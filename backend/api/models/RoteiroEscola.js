/**
 * RoteiroEscola.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'RoteiroEscola',
  primaryKey: 'roteiroEscola',
  attributes: {
    roteiroEscola: { type: 'number', autoIncrement: true },
    roteiro: { model: 'roteiro', required: true },
    escola: { model: 'escola', required: true }
  }
};