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

  // Adiciona o usuário à turma
  await Roteiro.addToCollection(turmaId, "responsavel").members([usuario.id]);

  await Autenticacao.updateOne({ id: usuario.id }).set({
    inviteToken: null,
    inviteExpiresAt: null
  });

  return res.ok({ message: "Convite confirmado!" });
}
