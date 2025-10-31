module.exports = {
  friendlyName: 'Listar controle mensal',
  description: 'Busca todos os dados do controle mensal: gráficos, melhor escola e transações.',

  inputs: {
    tipo: { type: 'string', required: false },
  },

  exits: {
    success: { description: 'Consulta realizada com sucesso.' },
    serverError: { description: 'Erro ao buscar dados.' },
  },

  fn: async function (inputs, exits) {
    try {
      async function obterMelhorEscola() {
        const pagamentos = await Pagamento.find({ status: 'pago' }).populate('motorista');
        const escolas = {};

        for (const p of pagamentos) {
          const alunos = await Aluno.find({ motorista: p.motorista.id }).populate('escola');
          for (const aluno of alunos) {
            const nomeEscola = aluno.escola?.nome || 'Desconhecida';
            escolas[nomeEscola] = (escolas[nomeEscola] || 0) + p.valor;
          }
        }

        const [melhorEscola, valor] = Object.entries(escolas).reduce(
          (a, b) => (b[1] > a[1] ? b : a),
          ['', 0]
        );

        return { escola: melhorEscola, rendimento: valor };
      }

      async function obterGraficos() {
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

        return {
          ganhosMensais,
          perdasMensais,
          ganhosMesAnterior: totalMesPassado,
          comparativo,
        };
      }

      async function obterTransacoes() {
        const pagamentos = await Pagamento.find()
          .populate('responsavel')
          .populate('motorista');

        const todosResponsaveisIds = [...new Set(pagamentos.map(p => p.responsavel?.id).filter(Boolean))];
        const alunos = await Aluno.find({ responsavel: todosResponsaveisIds }).populate('escola');

        const lista = [];

        for (const p of pagamentos) {
          const alunosDoResponsavel = alunos.filter(a => String(a.responsavel?._id || a.responsavel) === String(p.responsavel?._id || p.responsavel?.id));

          if (alunosDoResponsavel.length > 0) {
            alunosDoResponsavel.forEach(aluno => {
              lista.push({
                id_pagamento: p.id,
                aluno: aluno.nome,
                escola: aluno.escola?.nome || 'N/A',
                responsavel: p.responsavel?.nome || 'N/A',
                valor: p.valor,
                data: p.dta_pgmt || p.dta_vcto,
                status: p.status,
              });
            });
          } else {
            lista.push({
              id_pagamento: p.id,
              aluno: 'N/A',
              escola: 'N/A',
              responsavel: p.responsavel?.nome || 'N/A',
              valor: p.valor,
              data: p.dta_pgmt || p.dta_vcto,
              status: p.status,
            });
          }
        }

        return lista;
      }

      if (!inputs.tipo) {
        const [graficos, melhorEscola, transacoes] = await Promise.all([
          obterGraficos(),
          obterMelhorEscola(),
          obterTransacoes(),
        ]);

        return exits.success({
          graficos,
          melhorEscola,
          transacoes,
        });
      }

      if (inputs.tipo === 'melhorEscola') {
        return exits.success({ tipo: 'melhorEscola', ...await obterMelhorEscola() });
      }

      if (inputs.tipo === 'graficos') {
        return exits.success({ tipo: 'graficos', ...await obterGraficos() });
      }

      if (inputs.tipo === 'transacoes') {
        return exits.success({ tipo: 'listar', lista: await obterTransacoes() });
      }

    } catch (err) {
      sails.log.error(err);
      return exits.serverError({ message: 'Erro ao buscar dados do controle mensal.' });
    }
  },
};
