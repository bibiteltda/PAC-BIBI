const { models } = require('./index.js');

/**
 * @param {object} dadosAluno 
 * @returns {object} 
 * @throws {Error} 
 */
async function cadastrarAluno(dadosAluno) {
  const { nome, idade, id_responsavel, id_escola, id_motorista, id_turma } = dadosAluno;
  if (!nome || !idade || !id_responsavel || !id_escola || !id_motorista || !id_turma) {
    throw new Error('Todos os campos, incluindo o ID do responsável, escola, motorista e turma são obrigatórios.');
  }
  try {
    const [responsavel, escola, motorista, turma] = await Promise.all([
      models.Responsavel.findByPk(id_responsavel),
      models.Escola.findByPk(id_escola),
      models.Motorista.findByPk(id_motorista),
      models.Turma.findByPk(id_turma)
    ]);

    if (!responsavel) throw new Error(`O responsável com ID ${id_responsavel} não foi encontrado.`);
    if (!escola) throw new Error(`A escola com ID ${id_escola} não foi encontrada.`);
    if (!motorista) throw new Error(`O motorista com ID ${id_motorista} não foi encontrado.`);
    if (!turma) throw new Error(`A turma com ID ${id_turma} não foi encontrada.`);
    
    const novoAluno = await models.Aluno.create({
      nome,
      idade,
      responsavel: id_responsavel,
      escola: id_escola,
      motorista: id_motorista,
      id_turma: id_turma 
    });

    return novoAluno;

  } catch (error) {
    console.error('Erro ao cadastrar aluno:', error.message);
    throw error;
  }
}

module.exports = {
  cadastrarAluno
};