import { Op } from 'sequelize';
import db from "../database/index.js";
const { Responsavel, Aluno, Escola, Pagamento } = db;

const buscarFiltrados = async (req, res) => {
  try {
    const { escolaId, status, dataInicio, dataFim } = req.query;

    const queryOptions = {
      include: [
        {
          model: Responsavel,
          as: 'responsavelObj',
          required: true,
          include: [{
            model: Aluno,
            as: 'alunos',
            required: true,
            include: [{
              model: Escola,
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

    const pagamentos = await Pagamento.findAll(queryOptions);
    res.status(200).json(pagamentos);

  } catch (error) {
    console.error("Erro ao buscar relatórios de pagamento:", error);
    res.status(500).json({ message: "Falha ao buscar relatórios de pagamento." });
  }
};

export default { buscarFiltrados };
