const Responsavel = require('../../api/models/Responsavel');

describe('Model: Responsavel', () => {
  it('deve ter o nome correto da tabela', () => {
    expect(Responsavel.tableName).toBe('responsavel');
  });

  it('deve definir os atributos principais', () => {
    const attrs = Responsavel.attributes;
    expect(attrs).toHaveProperty('id');
    expect(attrs).toHaveProperty('nome');
    expect(attrs).toHaveProperty('contato');
    expect(attrs).toHaveProperty('cpf');
    expect(attrs).toHaveProperty('autenticacao');
  });

  it('deve exigir o campo nome', () => {
    expect(Responsavel.attributes.nome.required).toBe(true);
    expect(Responsavel.attributes.nome.maxLength).toBe(80);
  });

  it('deve ter relacionamentos corretos', () => {
    expect(Responsavel.attributes.autenticacao.model).toBe('autenticacao');
    expect(Responsavel.attributes.alunos.collection).toBe('aluno');
    expect(Responsavel.attributes.alunos.via).toBe('responsavel');
    expect(Responsavel.attributes.pagamentos.collection).toBe('pagamento');
    expect(Responsavel.attributes.pagamentos.via).toBe('responsavel');
  });

  it('deve ter timestamps automáticos', () => {
    expect(Responsavel.attributes.createdAt.autoCreatedAt).toBe(true);
    expect(Responsavel.attributes.updatedAt.autoUpdatedAt).toBe(true);
  });
});
