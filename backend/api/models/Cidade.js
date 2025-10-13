/**
 * Cidade.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Cidade',
  primaryKey: 'id_cidade',
  attributes: {
    id_cidade: { type: 'number', autoIncrement: true },
    nome: { type: 'string', required: true, maxLength: 255 },
    escolas: { collection: 'escola', via: 'cidade' }
  }
};