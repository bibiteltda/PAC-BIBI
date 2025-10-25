const Bairro = require('../../api/models/Bairro');

describe('Model: Bairro', () => {
  it('deve ter o nome correto da tabela', () => {
    expect(Bairro.tableName).toBe('bairro');
  });

  it('deve definir os atributos principais', () => {
    const attrs = Bairro.attributes;
    expect(attrs).toHaveProperty('id');
    expect(attrs).toHaveProperty('nome');
    expect(attrs).toHaveProperty('escolas');
  });

  it('deve exigir o campo nome e limitar o tamanho corretamente', () => {
    expect(Bairro.attributes.nome.required).toBe(true);
    expect(Bairro.attributes.nome.maxLength).toBe(255);
  });

  it('deve definir o relacionamento com escola corretamente', () => {
    expect(Bairro.attributes.escolas.collection).toBe('escola');
    expect(Bairro.attributes.escolas.via).toBe('bairro');
  });

  it('deve ter timestamps automáticos', () => {
    expect(Bairro.attributes.createdAt.autoCreatedAt).toBe(true);
    expect(Bairro.attributes.updatedAt.autoUpdatedAt).toBe(true);
  });
});
