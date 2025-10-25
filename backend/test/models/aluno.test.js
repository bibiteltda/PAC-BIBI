const Aluno = require('../../api/models/Aluno');

describe('Model: Aluno', () => {
    it('deve ter o nome correto da tabela', () => {
        expect(Aluno.tableName).toBe('aluno');
    });

    it('deve definir os atributos principais', () => {

        expect(Aluno.attributes).toHaveProperty('nome');
        expect(Aluno.attributes).toHaveProperty('idade');
        expect(Aluno.attributes).toHaveProperty('responsavel');
        expect(Aluno.attributes).toHaveProperty('escola');
        expect(Aluno.attributes).toHaveProperty('motorista');
        expect(Aluno.attributes).toHaveProperty('roteiro');
    });

    it('deve exigir o campo nome', () => {
        expect(Aluno.attributes.nome.required).toBe(true);
        expect(Aluno.attributes.nome.maxLength).toBe(80);
    });

    it('deve definir relacionamentos corretamente', () => {
        expect(Aluno.attributes.responsavel.model).toBe('responsavel');
        expect(Aluno.attributes.escola.model).toBe('escola');
        expect(Aluno.attributes.motorista.model).toBe('motorista');
        expect(Aluno.attributes.roteiro.model).toBe('roteiro');
    });
});