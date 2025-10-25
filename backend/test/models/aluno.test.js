const Aluno = require('../../api/models/Aluno');

describe('Model: Aluno', () => {
    it('deve ter o nome correto da tabela', () => {
        expect(Aluno.tableName).toBe('aluno');
    });

    it('deve definir os atributos principais', () => {
        const attrs = Aluno.attributes;

        expect(attrs).toHaveProperty('id');
        expect(attrs).toHaveProperty('nome');
        expect(attrs).toHaveProperty('idade');
        expect(attrs).toHaveProperty('responsavel');
        expect(attrs).toHaveProperty('escola');
        expect(attrs).toHaveProperty('motorista');
        expect(attrs).toHaveProperty('roteiro');
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

    it('deve ter timestamps automáticos', () => {
        expect(Aluno.attributes).toHaveProperty('createdAt');
        expect(Aluno.attributes).toHaveProperty('updatedAt');
    });
});
