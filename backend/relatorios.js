const { models } = require('./index.js');
const { Op } = require('sequelize');

async function buscarPagamentosFiltrados(filtros = {}) {
  const { escolaId, status, dataInicio, dataFim } = filtros;

  const queryOptions = {
    include: [
      {
        model: models.Responsavel,
        as: 'responsavelObj', 
        required: true,
        include: [{
          model: models.Aluno,
          as: 'alunos', 
          required: true,
          include: [{
            model: models.Escola,
            as: 'escolaObj', 
            required: true,
            where: escolaId ? { id_escola: escolaId } : undefined
          }]
        }]
      }
    ],
    where: {}
  };

  if (status) {
    queryOptions.where.status = status;
  }

  if (dataInicio && dataFim) {
    queryOptions.where.dta_vcto = {
      [Op.between]: [new Date(dataInicio), new Date(dataFim)]
    };
  }

  try {
    const pagamentos = await models.Pagamento.findAll(queryOptions);
    return pagamentos;
  } catch (error) {
    console.error("Erro ao buscar relatórios de pagamento:", error);
    throw new Error("Falha ao buscar relatórios de pagamento.");
  }
}

module.exports = {
  buscarPagamentosFiltrados
};
