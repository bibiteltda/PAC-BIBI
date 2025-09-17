const { models: { Pagamento, Responsavel, Motorista, Aluno, Escola } } = require("../database/index.js");
const { Op } = require("sequelize");

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

      const whereClause = {};
      const includeOptions = [
        { model: Responsavel, as: "responsavelObj", include: [] },
        { model: Motorista, as: "motoristaObj" }
      ];

      if (status) {
        whereClause.status = status;
      }

      if (dataInicio && dataFim) {
        whereClause.dta_pgmt = {
          [Op.between]: [dataInicio, dataFim]
        };
      } else if (dataInicio) {
        whereClause.dta_pgmt = {
          [Op.gte]: dataInicio
        };
      } else if (dataFim) {
        whereClause.dta_pgmt = {
          [Op.lte]: dataFim
        };
      }

      const responsavelInclude = includeOptions.find(inc => inc.model === Responsavel);
      
      if (escolaId) {
        responsavelInclude.include.push({
          model: Aluno,
          as: 'alunos',
          include: [{
            model: Escola,
            as: 'escolaObj', 
            where: { id_escola: escolaId }
          }]
        });
      } else {
        responsavelInclude.include.push({
          model: Aluno,
          as: 'alunos', 
          include: [{
            model: Escola,
            as: 'escolaObj'
          }]
        });
      }

      const lista = await Pagamento.findAll({
        where: whereClause,
        include: includeOptions
      });

      res.json(lista);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async findOne(req, res) {
    try {
      const item = await Pagamento.findByPk(req.params.id, {
        include: [
          { model: Responsavel, as: "responsavelObj" },
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

  async delete(req, res) {
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

module.exports = PagamentoController;