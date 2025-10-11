import { Op, fn, col, where, literal } from "sequelize";
import db from "../database/index.js";
const { Pagamento, Aluno, Escola } = db;

const DashboardController = {

  async getDashboardData(req, res) {
    try {
      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();

      const previousMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const previousMonth = previousMonthDate.getMonth() + 1;
      const previousYear = previousMonthDate.getFullYear();

      const ganhosDoMes = await Pagamento.sum('valor', {
        where: {
          status: 'PAGO',
          [Op.and]: [
            where(fn('EXTRACT', literal('MONTH FROM "dta_pgmt"')), currentMonth),
            where(fn('EXTRACT', literal('YEAR FROM "dta_pgmt"')), currentYear)
          ]
        }
      });
      
      const perdasDoMes = await Pagamento.sum('valor', {
        where: {
          status: { [Op.in]: ['ATRASADO', 'CANCELADO'] },
          [Op.and]: [
            where(fn('EXTRACT', literal('MONTH FROM "dta_pgmt"')), currentMonth),
            where(fn('EXTRACT', literal('YEAR FROM "dta_pgmt"')), currentYear)
          ]
        }
      });

      const ganhosMesAnterior = await Pagamento.sum('valor', {
        where: {
          status: 'PAGO',
          [Op.and]: [
            where(fn('EXTRACT', literal('MONTH FROM "dta_pgmt"')), previousMonth),
            where(fn('EXTRACT', literal('YEAR FROM "dta_pgmt"')), previousYear)
          ]
        }
      });

      const escolasComMaisAlunos = await Aluno.findAll({
        attributes: [
          [fn('COUNT', col('Aluno.id_aluno')), 'totalAlunos']
        ],
        include: [{
          model: Escola,
          as: 'escolaObj',
          attributes: ['nome']
        }],
        group: ['escolaObj.id_escola'], 
        order: [[fn('COUNT', col('Aluno.id_aluno')), 'DESC']],
        limit: 3
      });

      res.json({
        ganhosMensais: ganhosDoMes || 0,
        perdasMensais: perdasDoMes || 0,
        ganhosMesAnterior: ganhosMesAnterior || 0,
        escolasComMaisAlunos
      });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

};

export default DashboardController;
