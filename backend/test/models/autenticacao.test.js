const Autenticacao = require('../../api/models/Autenticacao');

describe('Model: Autenticacao', () => {
  it('deve ter o nome correto da tabela', () => {
    expect(Autenticacao.tableName).toBe('autenticacao');
  });

  it('deve definir os atributos principais', () => {
    const attrs = Autenticacao.attributes;

    expect(attrs).toHaveProperty('id');
    expect(attrs).toHaveProperty('login');
    expect(attrs).toHaveProperty('senha');
    expect(attrs).toHaveProperty('role');
  });

  it('deve exigir os campos obrigatórios login e senha', () => {
    expect(Autenticacao.attributes.login.required).toBe(true);
    expect(Autenticacao.attributes.senha.required).toBe(true);
  });

  it('deve ter limites de tamanho corretos', () => {
    expect(Autenticacao.attributes.login.maxLength).toBe(150);
    expect(Autenticacao.attributes.senha.maxLength).toBe(150);
    expect(Autenticacao.attributes.role.maxLength).toBe(50);
  });

  it('deve definir relacionamentos corretamente', () => {
    expect(Autenticacao.attributes.motorista.collection).toBe('motorista');
    expect(Autenticacao.attributes.motorista.via).toBe('autenticacao');

    expect(Autenticacao.attributes.responsavel.collection).toBe('responsavel');
    expect(Autenticacao.attributes.responsavel.via).toBe('autenticacao');
  });

  it('deve ter timestamps automáticos', () => {
    expect(Autenticacao.attributes.createdAt.autoCreatedAt).toBe(true);
    expect(Autenticacao.attributes.updatedAt.autoUpdatedAt).toBe(true);
  });
});
