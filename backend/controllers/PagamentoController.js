const { models: { Pagamento, Responsavel, Motorista, Aluno, Escola } } = require("../database");
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
        whereClause.dta_vcto = {
          [Op.between]: [
            new Date(dataInicio + "T00:00:00"),
            new Date(dataFim + "T23:59:59")
          ]
        };
      } else if (dataInicio) {
        whereClause.dta_vcto = { [Op.gte]: new Date(dataInicio + "T00:00:00") };
      } else if (dataFim) {
        whereClause.dta_vcto = { [Op.lte]: new Date(dataFim + "T23:59:59") };
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
          include: [{ model: Escola, as: 'escolaObj' }]
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
          { model: Responsavel, as: "responsavelObj", include: [
            { model: Aluno, as: 'alunos', include: [{ model: Escola, as: 'escolaObj' }] }
          ] },
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
