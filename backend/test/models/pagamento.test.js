const Pagamento = require('../../api/models/Pagamento');

describe('Model: Pagamento', () => {
  it('deve ter o nome correto da tabela', () => {
    expect(Pagamento.tableName).toBe('pagamento');
  });

  it('deve definir os atributos principais', () => {
    const attrs = Pagamento.attributes;
    expect(attrs).toHaveProperty('id');
    expect(attrs).toHaveProperty('valor');
    expect(attrs).toHaveProperty('dta_vcto');
    expect(attrs).toHaveProperty('dta_pgmt');
    expect(attrs).toHaveProperty('status');
    expect(attrs).toHaveProperty('responsavel');
    expect(attrs).toHaveProperty('motorista');
  });

  it('deve definir relacionamentos corretos', () => {
    expect(Pagamento.attributes.responsavel.model).toBe('responsavel');
    expect(Pagamento.attributes.motorista.model).toBe('motorista');
  });

  it('deve ter timestamps automáticos', () => {
    expect(Pagamento.attributes.createdAt.autoCreatedAt).toBe(true);
    expect(Pagamento.attributes.updatedAt.autoUpdatedAt).toBe(true);
  });
});
