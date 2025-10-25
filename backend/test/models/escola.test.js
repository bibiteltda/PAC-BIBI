const Escola = require('../../api/models/Escola');

describe('Model: Escola', () => {
  it('deve ter o nome correto da tabela', () => {
    expect(Escola.tableName).toBe('escola');
  });

  it('deve definir os atributos principais', () => {
    const attrs = Escola.attributes;
    expect(attrs).toHaveProperty('id');
    expect(attrs).toHaveProperty('nome');
    expect(attrs).toHaveProperty('telefone');
    expect(attrs).toHaveProperty('logradouro');
    expect(attrs).toHaveProperty('bairro');
    expect(attrs).toHaveProperty('cidade');
  });

  it('deve exigir o campo nome', () => {
    expect(Escola.attributes.nome.required).toBe(true);
    expect(Escola.attributes.nome.maxLength).toBe(255);
  });

  it('deve ter relacionamentos corretos', () => {
    expect(Escola.attributes.bairro.model).toBe('bairro');
    expect(Escola.attributes.cidade.model).toBe('cidade');

    expect(Escola.attributes.alunos.collection).toBe('aluno');
    expect(Escola.attributes.alunos.via).toBe('escola');

    expect(Escola.attributes.roteiros.collection).toBe('roteiro');
    expect(Escola.attributes.roteiros.via).toBe('escolas');
  });

  it('deve ter timestamps automáticos', () => {
    expect(Escola.attributes.createdAt.autoCreatedAt).toBe(true);
    expect(Escola.attributes.updatedAt.autoUpdatedAt).toBe(true);
  });
});
