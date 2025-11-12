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
        const pagamentos = await Pagamento.find({ status: 'pago' }).populate('aluno');

        const escolas = {};

        for (const p of pagamentos) {
          if (!p.aluno) continue;

          const aluno = await Aluno.findOne({ id: p.aluno.id }).populate('escola');
          if (!aluno || !aluno.escola) continue;

          const nomeEscola = aluno.escola.nome;
          escolas[nomeEscola] = (escolas[nomeEscola] || 0) + p.valor;
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
        try {
          const pagamentos = await Pagamento.find()
            .populate('responsavel')
            .populate('motorista')
            .populate('aluno');
      
          const lista = pagamentos.map(p => ({
            id_transacao: p.id,
            aluno: p.aluno?.nome || 'N/A',
            responsavel: p.responsavel?.nome || 'N/A',
            status: p.status,
            valor: p.valor,
          }));
      
          return lista;
        } catch (error) {
          sails.log.error('Erro ao obter transações:', error);
          throw error;
        }
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
