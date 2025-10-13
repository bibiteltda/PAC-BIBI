/**
 * Bairro.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Bairro',
  primaryKey: 'id_bairro',
  attributes: {
    id_bairro: { type: 'number', autoIncrement: true },
    nome: { type: 'string', required: true, maxLength: 255 },
    escolas: { collection: 'escola', via: 'bairro' }
  }
};