module.exports = {

  attributes: {
    status: {
      type: 'string',
      required: true,
      isIn: ['Planejada', 'Ativa', 'Inativa', 'Concluída'], // Exemplo de status
      description: 'Status da turma.'
    },

    data: {
      type: 'ref', 
      columnType: 'date', // No banco, será um tipo 'date' (só YYYY-MM-DD)
      required: true,
      description: 'Data da turma.'
    },

    // --- ASSOCIAÇÕES (relacionamentos com outras tabelas) ---

    escola: {
      model: 'escola', 
      required: true
    },

    motorista: {
      model: 'motorista' 
    },

    roteiro: {
      model: 'roteiro' 
    },

    // --- Relacionamento Inverso: Uma turma tem VÁRIOS alunos ---
    alunos: {
      collection: 'aluno', // <-- Nome do modelo 'Aluno.js'
      via: 'turma'          // <-- Nome do campo que vamos criar no Aluno.js
    }

  },

};