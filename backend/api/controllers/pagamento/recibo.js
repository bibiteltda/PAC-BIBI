module.exports = {
  friendlyName: 'Gerar recibo',
  description: 'Gera um recibo simples baseado em um pagamento.',
  inputs: { pagamentoId: { type: 'number', required: true, description: 'ID do pagamento para gerar o recibo.' } },
  exits: { success: { description: 'Recibo gerado com sucesso.' }, notFound: { description: 'Pagamento não encontrado.' } },

  fn: async function (inputs, exits) {
    const pagamento = await Pagamento
      .findOne({ id: inputs.pagamentoId })
      .populate('responsavel')
      .populate('motorista');

    if (!pagamento) {
      return exits.notFound({ error: 'Pagamento não encontrado.' });
    }

    function numeroParaExtenso(valor) {
      const extenso = require('numero-por-extenso').porExtenso;
      return extenso(valor, numero-por-extenso.estilo.real);
    }

    const dataAtual = new Date();
    const dataFormatada = dataAtual.toLocaleDateString('pt-BR');

    const recibo = {
      id: pagamento.id,
      pagante: pagamento.responsavel?.nome || 'Não informado',
      valor: numeroParaExtenso(pagamento.valor),
      data: dataFormatada,
      assinatura: pagamento.motorista?.nome || 'Não informado'
    };

    return exits.success(recibo);
  }
};
