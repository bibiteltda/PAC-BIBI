import db from "../database/index.js";
const { Bairro, Escola, Cidade } = db;

const EscolaController = {
  async create(req, res) {
    try {
      const novo = await Escola.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const lista = await Escola.findAll({
        include: [
          { model: Bairro, as: "bairroObj" },
          { model: Cidade, as: "cidadeObj" }
        ]
      });
      res.json(lista);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async findOne(req, res) {
    try {
      const item = await Escola.findByPk(req.params.id, {
        include: [
          { model: Bairro, as: "bairroObj" },
          { model: Cidade, as: "cidadeObj" }
        ]
      });
      if (!item) return res.status(404).json({ erro: "Escola não encontrada" });
      res.json(item);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async update(req, res) {
    try {
      const item = await Escola.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: "Escola não encontrada" });
      await item.update(req.body);
      res.json(item);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async delete(req, res) {
    try {
      const item = await Escola.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: "Escola não encontrada" });
      await item.destroy();
      res.json({ mensagem: "Escola removida" });
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }
};

export default EscolaController;
