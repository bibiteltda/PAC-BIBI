const Cidade = require('../../api/models/Cidade');

describe('Model: Cidade', () => {
  it('deve ter o nome correto da tabela', () => {
    expect(Cidade.tableName).toBe('cidade');
  });

  it('deve definir os atributos principais', () => {
    const attrs = Cidade.attributes;
    expect(attrs).toHaveProperty('id');
    expect(attrs).toHaveProperty('nome');
    expect(attrs).toHaveProperty('escolas');
  });

  it('deve exigir o campo nome e limitar o tamanho corretamente', () => {
    expect(Cidade.attributes.nome.required).toBe(true);
    expect(Cidade.attributes.nome.maxLength).toBe(255);
  });

  it('deve definir o relacionamento com escola corretamente', () => {
    expect(Cidade.attributes.escolas.collection).toBe('escola');
    expect(Cidade.attributes.escolas.via).toBe('cidade');
  });

  it('deve ter timestamps automáticos', () => {
    expect(Cidade.attributes.createdAt.autoCreatedAt).toBe(true);
    expect(Cidade.attributes.updatedAt.autoUpdatedAt).toBe(true);
  });
});
