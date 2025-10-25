const Motorista = require('../../api/models/Motorista');

describe('Model: Motorista', () => {
  it('deve ter o nome correto da tabela', () => {
    expect(Motorista.tableName).toBe('motorista');
  });

  it('deve definir os atributos principais', () => {
    const attrs = Motorista.attributes;
    expect(attrs).toHaveProperty('id');
    expect(attrs).toHaveProperty('nome');
    expect(attrs).toHaveProperty('contato');
    expect(attrs).toHaveProperty('cpf');
    expect(attrs).toHaveProperty('autenticacao');
  });

  it('deve exigir o campo nome', () => {
    expect(Motorista.attributes.nome.required).toBe(true);
    expect(Motorista.attributes.nome.maxLength).toBe(80);
  });

  it('deve ter relacionamentos corretos', () => {
    expect(Motorista.attributes.autenticacao.model).toBe('autenticacao');

    expect(Motorista.attributes.pagamentos.collection).toBe('pagamento');
    expect(Motorista.attributes.pagamentos.via).toBe('motorista');

    expect(Motorista.attributes.alunos.collection).toBe('aluno');
    expect(Motorista.attributes.alunos.via).toBe('motorista');

    expect(Motorista.attributes.roteiros.collection).toBe('roteiro');
    expect(Motorista.attributes.roteiros.via).toBe('motorista');
  });

  it('deve ter timestamps automáticos', () => {
    expect(Motorista.attributes.createdAt.autoCreatedAt).toBe(true);
    expect(Motorista.attributes.updatedAt.autoUpdatedAt).toBe(true);
  });
});
