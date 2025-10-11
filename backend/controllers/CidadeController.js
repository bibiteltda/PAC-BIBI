import db from "../database/index.js";
const { Cidade } = db;


const CidadeController = {
  async create(req, res) {
    try {
      const novo = await Cidade.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const lista = await Cidade.findAll();
      res.json(lista);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async findOne(req, res) {
    try {
      const item = await Cidade.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: "Cidade não encontrada" });
      res.json(item);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async update(req, res) {
    try {
      const item = await Cidade.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: "Cidade não encontrada" });
      await item.update(req.body);
      res.json(item);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async delete(req, res) {
    try {
      const item = await Cidade.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: "Cidade não encontrada" });
      await item.destroy();
      res.json({ mensagem: "Cidade removida" });
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }
};

export default CidadeController;
