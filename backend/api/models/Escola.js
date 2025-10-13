/**
 * Escola.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Escola',
  primaryKey: 'id_escola',
  attributes: {
    id_escola: { type: 'number', autoIncrement: true },
    nome: { type: 'string', required: true, maxLength: 255 },
    telefone: { type: 'string', maxLength: 15 },
    logradouro: { type: 'string', maxLength: 100 },
    bairro: { model: 'bairro', required: true },
    cidade: { model: 'cidade', required: true },
    alunos: { collection: 'aluno', via: 'escola' },
    roteiros: { collection: 'roteiro', via: 'escola', through: 'roteiroescola' }
  }
};