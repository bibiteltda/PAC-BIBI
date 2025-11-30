module.exports = {

  friendlyName: 'Gerar recibo',
  description: 'Gera um recibo simples baseado em um pagamento.',

  inputs: {
    pagamentoId: {
      type: 'number',
      required: true,
      description: 'ID do pagamento para gerar o recibo.'
    }
  },

  exits: {
    success: {
      description: 'Recibo gerado com sucesso.'
    },
    notFound: {
      description: 'Pagamento não encontrado.'
    }
  },

  fn: async function (inputs, exits) {
    const pagamento = await Pagamento
      .findOne({ id: inputs.pagamentoId })
      .populate('responsavel')
      .populate('motorista');

    if (!pagamento) {
      return exits.notFound({
        error: 'Pagamento não encontrado.'
      });
    }

    const { porExtenso, estilo } = require('numero-por-extenso');

    function numeroParaExtenso(valor) {
      try {
        return porExtenso(valor, estilo.monetario);
      } catch (err) {
        sails.log.error('Erro ao converter número para extenso:', err);
        return `${valor} (erro ao converter)`;
      }
    }

    const dataAtual = new Date();
    const dataFormatada = dataAtual.toLocaleDateString('pt-BR');

    const recibo = {
      id: pagamento.id,
      pagante: pagamento.responsavel?.nome || 'Não informado',
      valor: pagamento.valor,
      valorExtenso: numeroParaExtenso(pagamento.valor),
      ref: "Ao pagamento da mensalidade de transporte escolar",
      data: dataFormatada,
      assinatura: pagamento.motorista?.nome || 'Não informado'
    };

    return exits.success({ recibo });
  }
};
