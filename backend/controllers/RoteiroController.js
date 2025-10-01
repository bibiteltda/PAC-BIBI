const { Roteiro, Escola } = require('../database/models.js');

const RoteiroController = {
  async listar(req, res) {
    try {
      const roteiros = await Roteiro.findAll({
        include: { model: Escola, as: 'escolas' }
      });
      res.json(roteiros);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const roteiro = await Roteiro.findByPk(req.params.id, {
        include: { model: Escola, as: 'escolas' }
      });
      if (!roteiro) return res.status(404).json({ error: 'Roteiro não encontrado' });
      res.json(roteiro);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async criar(req, res) {
    try {
      const roteiro = await Roteiro.create(req.body);
      res.status(201).json(roteiro);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const [updated] = await Roteiro.update(req.body, { where: { id_roteiro: req.params.id } });
      if (!updated) return res.status(404).json({ error: 'Roteiro não encontrado' });
      res.json({ message: 'Roteiro atualizado com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const deleted = await Roteiro.destroy({ where: { id_roteiro: req.params.id } });
      if (!deleted) return res.status(404).json({ error: 'Roteiro não encontrado' });
      res.json({ message: 'Roteiro excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = RoteiroController;