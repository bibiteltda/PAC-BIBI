import db from "../database/index.js";
const { Bairro } = db;

const BairroController = {
  async create(req, res) {
    try {
      const novo = await Bairro.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const lista = await Bairro.findAll();
      res.json(lista);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async findOne(req, res) {
    try {
      const item = await Bairro.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: "Bairro não encontrado" });
      res.json(item);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async update(req, res) {
    try {
      const item = await Bairro.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: "Bairro não encontrado" });
      await item.update(req.body);
      res.json(item);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async delete(req, res) {
    try {
      const item = await Bairro.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: "Bairro não encontrado" });
      await item.destroy();
      res.json({ mensagem: "Bairro removido" });
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }
};

export default BairroController;
