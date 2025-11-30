module.exports = async function confirmarConvite(req, res) {

  const token = req.query.token;
  const turmaId = req.query.turma;

  if (!token) {
    return res.status(400).send({ error: "Token faltando" });
  }

  const usuario = await Autenticacao.findOne({ inviteToken: token });

  if (!usuario) {
    return res.status(404).send({ error: "Convite inválido." });
  }

  if (usuario.inviteExpiresAt < new Date()) {
    return res.status(410).send({ error: "Convite expirado." });
  }

  // Encontrar o responsável que está vinculado a este Autenticacao
  const responsavel = await Responsavel.findOne({ autenticacao: usuario.id });

  if (!responsavel) {
    return res.status(404).send({ error: "Responsável não encontrado." });
  }

  // Buscar todos os alunos desse responsável
  const alunos = await Aluno.find({ responsavel: responsavel.id });

  if (alunos.length === 0) {
    return res.status(404).send({
      error: "Nenhum aluno encontrado para esse responsável."
    });
  }

  // Extrair ids
  const alunosIds = alunos.map(a => a.id);

  // Adicionar alunos à turma (Roteiro)
  await Roteiro.addToCollection(turmaId, "alunos").members(alunosIds);

  // Limpar token
  await Autenticacao.updateOne({ id: usuario.id }).set({
    inviteToken: null,
    inviteExpiresAt: null
  });

  return res.ok({
    message: "Convite confirmado! Alunos adicionados à turma.",
    responsavel: responsavel.id,
    alunosAdicionados: alunosIds
  });
};
