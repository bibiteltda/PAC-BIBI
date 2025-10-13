const { Aluno, Responsavel, Escola, Motorista, Turma, Roteiro } = require("../database/index.js");

const AlunoController = {
async create(req, res) {
    try {
      // Pega todos os dados enviados pelo frontend
      const dadosAluno = req.body;
      const { nome, idade, responsavel, escola, motorista, id_turma, roteiro } = dadosAluno;

      if (!nome || !idade || !responsavel || !escola || !motorista || !id_turma || !roteiro) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios: nome, idade, responsavel, escola, motorista, id_turma e roteiro.' });
      }

      const [resp, esc, mot, tur, rot] = await Promise.all([
        Responsavel.findByPk(responsavel),
        Escola.findByPk(escola),
        Motorista.findByPk(motorista),
        Turma.findByPk(id_turma),
        Roteiro.findByPk(roteiro),
      ]);

      if (!resp) return res.status(400).json({ erro: `O responsável com ID ${responsavel} não foi encontrado.` });
      if (!esc) return res.status(400).json({ erro: `A escola com ID ${escola} não foi encontrada.` });
      if (!mot) return res.status(400).json({ erro: `O motorista com ID ${motorista} não foi encontrado.` });
      if (!tur) return res.status(400).json({ erro: `A turma com ID ${id_turma} não foi encontrada.` });
      if (!rot) return res.status(400).json({ erro: `O roteiro com ID ${roteiro} não foi encontrado.` });

      const novoAluno = await Aluno.create(dadosAluno);
      res.status(201).json(novoAluno);

    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);
      res.status(500).json({ erro: 'Ocorreu um erro no servidor ao cadastrar o aluno.' });
    }
},

  async findAll(req, res) {
    try {
      const alunos = await Aluno.findAll({
        include: [
          { model: Responsavel, as: 'responsavelObj' },
          { model: Escola, as: 'escolaObj' },
          { model: Motorista, as: 'motoristaObj' },
          { model: Roteiro, as: 'roteiroObj' }
        ]
      });
      res.json(alunos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findOne(req, res) {
    try {
      const item = await Aluno.findByPk(req.params.id, {
        include: [
          { model: Responsavel, as: "responsavelObj" },
          { model: Escola, as: "escolaObj" },
          { model: Motorista, as: "motoristaObj" }
        ]
      });
      if (!item) return res.status(404).json({ erro: "Aluno não encontrado" });
      res.json(item);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async update(req, res) {
    try {
      const item = await Aluno.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: "Aluno não encontrado" });
      await item.update(req.body);
      res.json(item);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async delete(req, res) {
    try {
      const item = await Aluno.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: "Aluno não encontrado" });
      await item.destroy();
      res.json({ mensagem: "Aluno removido" });
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }
};

export default AlunoController;
