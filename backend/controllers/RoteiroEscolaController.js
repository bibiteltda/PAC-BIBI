const { RoteiroEscola, Roteiro, Escola } = require('../models');

const RoteiroEscolaController = {
  async listar(req, res) {
    try {
      const list = await RoteiroEscola.findAll({
        include: [
          { model: Roteiro, as: 'roteiroObj' },
          { model: Escola, as: 'escolaObj' }
        ]
      });
      res.json(list);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async criar(req, res) {
    try {
      const relacao = await RoteiroEscola.create(req.body);
      res.status(201).json(relacao);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const deleted = await RoteiroEscola.destroy({ where: { roteiroEscola: req.params.id } });
      if (!deleted) return res.status(404).json({ error: 'Relação não encontrada' });
      res.json({ message: 'Relação removida com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = RoteiroEscolaController