module.exports = {
  friendlyName: 'Listar controle mensal',
  description: 'Busca dados de controle mensal, gráficos ou relatórios.',

  inputs: {
    tipo: { type: 'string', required: false },
  },

  exits: {
    success: { description: 'Consulta realizada com sucesso.' },
    serverError: { description: 'Erro ao buscar dados.' },
  },

  fn: async function (inputs, exits) {
    try {
      if (inputs.tipo === 'melhorEscola') {
        const pagamentos = await Pagamento.find({ status: 'pago' }).populate('motorista');
        const escolas = {};

        for (const p of pagamentos) {
          const alunos = await Aluno.find({ motorista: p.motorista }).populate('escola');
          for (const aluno of alunos) {
            const nomeEscola = aluno.escola?.nome || 'Desconhecida';
            escolas[nomeEscola] = (escolas[nomeEscola] || 0) + p.valor;
          }
        }

        const [melhorEscola, valor] = Object.entries(escolas).reduce(
          (a, b) => (b[1] > a[1] ? b : a),
          ['', 0]
        );

        return exits.success({ tipo: 'melhorEscola', escola: melhorEscola, rendimento: valor });
      }

      if (inputs.tipo === 'graficos') {
        const agora = new Date();
        const mesAtual = agora.getMonth() + 1;
        const anoAtual = agora.getFullYear();
        const mesPassado = mesAtual === 1 ? 12 : mesAtual - 1;
        const anoPassado = mesAtual === 1 ? anoAtual - 1 : anoAtual;

        const pagos = await Pagamento.find({ status: 'pago' });

        let ganhosMensais = 0;
        let perdasMensais = 0;
        let totalMesAtual = 0;
        let totalMesPassado = 0;

        pagos.forEach(p => {
          const data = new Date(p.dta_pgmt);
          const mes = data.getMonth() + 1;
          const ano = data.getFullYear();

          if (mes === mesAtual && ano === anoAtual) totalMesAtual += p.valor;
          if (mes === mesPassado && ano === anoPassado) totalMesPassado += p.valor;

          if (p.valor >= 0) ganhosMensais += p.valor;
          else perdasMensais += Math.abs(p.valor);
        });

        const comparativo = totalMesAtual - totalMesPassado;

        return exits.success({
          tipo: 'graficos',
          ganhosMensais,
          perdasMensais,
          comparativo: {
            mesAtual: totalMesAtual,
            mesPassado: totalMesPassado,
            diferenca: comparativo,
          },
        });
      }

      if (inputs.tipo === 'transacoes' || !inputs.tipo) {
        const pagamentos = await Pagamento.find().populate('responsavel').populate('motorista');
        const lista = [];

        for (const p of pagamentos) {
          const aluno = await Aluno.findOne({ motorista: p.motorista }).populate('escola');

          lista.push({
            id: p.id_pagamento,
            aluno: aluno ? aluno.nome : 'N/A',
            escola: aluno?.escola?.nome || 'N/A',
            valor: p.valor,
            data: p.dta_pgmt || p.dta_vcto,
            status: p.status,
          });
        }

        return exits.success({ tipo: 'listar', lista });
      }

    } catch (err) {
      sails.log.error(err);
      return exits.serverError({ message: 'Erro ao buscar dados do controle mensal.' });
    }
  },
};
