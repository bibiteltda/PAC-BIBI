const { Responsavel, Autenticacao } = require("../database/models.js");

const ResponsavelController = {
  async create(req, res) {
    try {
      const novo = await Responsavel.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const lista = await Responsavel.findAll({
        include: [{ model: Autenticacao, as: "autenticacao" }]
      });
      res.json(lista);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async findOne(req, res) {
    try {
      const item = await Responsavel.findByPk(req.params.id, {
        include: [{ model: Autenticacao, as: "autenticacao" }]
      });
      if (!item) return res.status(404).json({ erro: "Responsável não encontrado" });
      res.json(item);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async update(req, res) {
    try {
      const item = await Responsavel.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: "Responsável não encontrado" });
      await item.update(req.body);
      res.json(item);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async delete(req, res) {
    try {
      const item = await Responsavel.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: "Responsável não encontrado" });
      await item.destroy();
      res.json({ mensagem: "Responsável removido" });
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }
};

module.exports = ResponsavelController;
