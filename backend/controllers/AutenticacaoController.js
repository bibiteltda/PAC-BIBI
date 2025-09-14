const { Autenticacao } = require("../database/models.js");

const AutenticacaoController = {
  async create(req, res) {
    try {
      const novo = await Autenticacao.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const lista = await Autenticacao.findAll();
      res.json(lista);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async findOne(req, res) {
    try {
      const item = await Autenticacao.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: "Autenticação não encontrada" });
      res.json(item);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async update(req, res) {
    try {
      const item = await Autenticacao.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: "Autenticação não encontrada" });
      await item.update(req.body);
      res.json(item);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async delete(req, res) {
    try {
      const item = await Autenticacao.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: "Autenticação não encontrada" });
      await item.destroy();
      res.json({ mensagem: "Autenticação removida" });
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }
};

module.exports = AutenticacaoController;
