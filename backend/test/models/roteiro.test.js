const Roteiro = require('../../api/models/Roteiro');

describe('Model: Roteiro', () => {
  it('deve ter o nome correto da tabela', () => {
    expect(Roteiro.tableName).toBe('roteiro');
  });

  it('deve definir os atributos principais', () => {
    const attrs = Roteiro.attributes;
    expect(attrs).toHaveProperty('id');
    expect(attrs).toHaveProperty('turno');
    expect(attrs).toHaveProperty('escola');
    expect(attrs).toHaveProperty('alunos');
    expect(attrs).toHaveProperty('motorista');
  });

  it('deve ter relacionamentos corretos', () => {
    expect(Roteiro.attributes.escola.model).toBe('escola');
    expect(Roteiro.attributes.alunos.collection).toBe('aluno');
    expect(Roteiro.attributes.alunos.via).toBe('roteiro');
    expect(Roteiro.attributes.motorista.model).toBe('motorista');
  });

  it('deve ter timestamps automáticos', () => {
    expect(Roteiro.attributes.createdAt.autoCreatedAt).toBe(true);
    expect(Roteiro.attributes.updatedAt.autoUpdatedAt).toBe(true);
  });
});
