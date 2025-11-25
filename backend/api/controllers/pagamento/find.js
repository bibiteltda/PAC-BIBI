module.exports = {

  async find(req, res) {
    // Parâmetros de filtro
    const { escolaId, status, data_inicial, data_final } = req.query; 

    // Objeto 'where' para buscar Alunos
    let alunoWhere = {};  
    
    // ============================
    // 1. FILTRO POR ESCOLA (Alvo: Modelo Aluno)
    // ============================
    if (escolaId && escolaId !== 'Todas') {
        alunoWhere.escola = Number(escolaId);
    }
    
    // ============================
    // 2. FILTROS DE PAGAMENTO (Alvo: Coleção Pagamentos)
    // ============================
    let pagamentoWhere = {};

    if (status && status !== 'Todas') { 
      pagamentoWhere.status = status;
    }

    if (data_inicial && data_final) {
      // Filtra por vencimento (dta_vcto)
      pagamentoWhere.dta_vcto = { '>=': data_inicial, '<=': data_final };
    }
    
    // Garante que apenas pagamentos com aluno definido sejam buscados
    pagamentoWhere.aluno = { '!=': null }; 

    // ============================
    // 3. CONSULTA REVERSA E POPULAÇÃO
    // ============================
    try {
        // Encontra os ALUNOS que atendem ao filtro de escola
        const alunos = await Aluno.find({ where: alunoWhere })
            // Popula a coleção de PAGAMENTOS aplicando os filtros de status/data na sub-consulta
            .populate('pagamentos', { 
                where: pagamentoWhere 
            })
            // Popula os demais relacionamentos do Aluno (se necessário)
            .populate('escola'); 
        
        
        let pagamentosFinais = [];

        // 4. Mapear e Extrair os Pagamentos
        alunos.forEach(aluno => {
            if (aluno.pagamentos && aluno.pagamentos.length > 0) {
                // Para cada pagamento encontrado no aluno, o adicionamos à lista final
                aluno.pagamentos.forEach(pagamento => {
                    // Retorna o objeto Pagamento, incluindo o Aluno populado
                    pagamentosFinais.push({
                        ...pagamento,
                        // Você precisará fazer uma consulta adicional (ou usar a versão com SQL Bruto) 
                        // se quiser que 'motorista' e 'responsavel' sejam populados na mesma requisição.
                        // Para simplificar, vou garantir que o Aluno esteja visível na resposta.
                        aluno: { 
                            id: aluno.id,
                            nome: aluno.nome,
                            escola: aluno.escola 
                        }
                    });
                });
            }
        });

        // NOTA: Os campos 'motorista' e 'responsavel' não são populados nessa consulta reversa.
        // Para incluí-los, você precisaria de uma segunda consulta `Pagamento.find({ id: idsPagamentos }).populate(...)`.
        
        return res.json(pagamentosFinais);

    } catch (err) {
        console.error('Erro na consulta reversa:', err);
        return res.status(500).json({ error: "Erro ao buscar pagamentos" });
    }
  }

};