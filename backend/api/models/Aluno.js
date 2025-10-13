/**
 * Aluno.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Aluno',
  primaryKey: 'id_aluno',
  attributes: {
    id_aluno: { type: 'number', autoIncrement: true },
    nome: { type: 'string', required: true, maxLength: 80 },
    idade: { type: 'number' },
    responsavel: { model: 'responsavel', required: true },
    escola: { model: 'escola', required: true },
    motorista: { model: 'motorista', required: true },
    roteiro: { model: 'roteiro', required: true }
  }
};
