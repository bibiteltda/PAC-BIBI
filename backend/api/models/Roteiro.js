/**
 * Roteiro.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Roteiro',
  primaryKey: 'id_roteiro',
  attributes: {
    id_roteiro: { type: 'number', autoIncrement: true },
    turno: { type: 'number', required: true },
    alunos: { collection: 'aluno', via: 'roteiro' },
    escolas: { collection: 'escola', via: 'roteiro', through: 'roteiroescola' }
  }
};
