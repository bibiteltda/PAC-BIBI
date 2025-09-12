const { Pagamento, Responsavel, Motorista } = require("../../database/models.js");

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
      const lista = await Pagamento.findAll({
        include: [
          { model: Responsavel, as: "responsavelObj" },
          { model: Motorista, as: "motoristaObj" }
        ]
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
