module.exports = async function findOne(req, res) {
  const item = await Pagamento.findOne({ id: req.params.id }).populateAll();
  if (!item) return res.notFound();
  return res.json(item);
};
