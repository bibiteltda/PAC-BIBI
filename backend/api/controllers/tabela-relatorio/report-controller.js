module.exports = {
  list: async function (req, res) {
    try {
      const registros = await Pagamento.find()
        .populate('aluno')
        .populate('escola');

        const tabela = registros.map(r => ({
          aluno: r.aluno.nome,
          escola: r.escola.nome,
          valor: r.valor,
          data: r.data,
          status: r.status
        }));

        return res.json(tabela);
    } catch (err) {
      return res.ServerError(err);
    }
  }
}