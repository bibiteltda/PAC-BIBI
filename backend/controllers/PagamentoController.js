import { Op } from "sequelize";
import db from "../database/index.js";
const { Pagamento, Responsavel, Motorista, Aluno, Escola, Roteiro } = db;

const PagamentoController = {
  async create(req, res) {
    try {
      const novo = await Pagamento.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const { escolaId, status, dataInicio, dataFim } = req.query;

      // Construindo filtro de pagamentos
      const whereClause = {};
      if (status) whereClause.status = status;
      if (dataInicio && dataFim) {
        whereClause.dta_vcto = {
          [Op.between]: [new Date(dataInicio + "T00:00:00"), new Date(dataFim + "T23:59:59")]
        };
      } else if (dataInicio) {
        whereClause.dta_vcto = { [Op.gte]: new Date(dataInicio + "T00:00:00") };
      } else if (dataFim) {
        whereClause.dta_vcto = { [Op.lte]: new Date(dataFim + "T23:59:59") };
      }

      // Query única
      const pagamentos = await Pagamento.findAll({
        where: whereClause,
        attributes: ["id_pagamento", "valor", "dta_vcto", "dta_pgmt", "status"],
        include: [
          {
            model: Responsavel,
            as: "responsavelObj",
            attributes: ["id_responsavel", "nome"],
            include: [
              {
                model: Aluno,
                as: "alunos",
                attributes: ["id_aluno", "nome", "roteiro", "escola"],
                required: false,
                include: [
                  {
                    model: Escola,
                    as: "escolaObj",
                    attributes: ["id_escola", "nome"],
                    where: escolaId ? { id_escola: escolaId } : undefined,
                    required: !!escolaId
                  },
                  {
                    model: Roteiro,
                    as: "roteiroObj",
                    attributes: ["id_roteiro", "turno"]
                  }
                ]
              }
            ]
          },
          {
            model: Motorista,
            as: "motoristaObj",
            attributes: ["id_motorista", "nome"]
          }
        ],
        order: [["dta_vcto", "DESC"]]
      });

      res.json(pagamentos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: err.message });
    }
  },

  async findOne(req, res) {
  try {
    const item = await Pagamento.findByPk(req.params.id, {
      include: [
        {
          model: Responsavel, as: "responsavelObj", include: [
            { model: Aluno, as: 'alunos', include: [{ model: Escola, as: 'escolaObj' }] }
          ]
        },
        { model: Motorista, as: "motoristaObj" }
      ]
    });
    if (!item) return res.status(404).json({ erro: "Pagamento não encontrado" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
},

  async update(req, res) {
  try {
    const item = await Pagamento.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: "Pagamento não encontrado" });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
},

  async delete (req, res) {
  try {
    const item = await Pagamento.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: "Pagamento não encontrado" });
    await item.destroy();
    res.json({ mensagem: "Pagamento removido" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}
};

export default PagamentoController;