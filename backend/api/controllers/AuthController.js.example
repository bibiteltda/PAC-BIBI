/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 */

const jwt = require('jsonwebtoken');

module.exports = {

  async login(req, res) {
    sails.log.info('===== Login START =====');
    sails.log.info('Body recebido:', req.body);

    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.badRequest({ message: 'Email e senha são obrigatórios.' });
      }

      const usuario = await Autenticacao.findOne({ login: email });

      if (!usuario) {
        return res.notFound({ message: 'Usuário não encontrado.' });
      }

      const senhaCorreta = await sails.helpers.comparePassword(senha, usuario.senha);
      if (!senhaCorreta) {
        return res.forbidden({ message: 'Senha incorreta.' });
      }

      const token = jwt.sign(
        { id: usuario.id_autenticacao, role: usuario.role },
        process.env.JWT_SECRET || 'chave_super_segura',
        { expiresIn: '7d' }
      );

      return res.ok({
        message: 'Login realizado com sucesso!',
        token,
        usuario: {
          id: usuario.id_autenticacao,
          nome: usuario.login,
          email: usuario.login,
          role: usuario.role
        }
      });

    } catch (err) {
      sails.log.error('Erro no login:', err);
      return res.serverError({ message: 'Erro interno no login.' });
    }
  },

  async register(req, res) {
    sails.log.info('===== Register START =====');
    sails.log.info('Body recebido:', req.body);

    try {
      const { nome, email, senha, cpf, celular, role } = req.body;

      if (!nome || !email || !senha || !cpf || !celular || !role) {
        return res.badRequest({ message: 'Todos os campos são obrigatórios.' });
      }

      const senhaCriptografada = await sails.helpers.hashPassword(senha);

      const novoUsuario = await Autenticacao.create({
        login: email,
        senha: senhaCriptografada,
        role
      }).fetch();

      const token = jwt.sign(
        { id: novoUsuario.id_autenticacao, role: novoUsuario.role },
        process.env.JWT_SECRET || 'chave_super_segura',
        { expiresIn: '7d' }
      );

      return res.ok({
        message: 'Usuário criado com sucesso!',
        usuario: {
          id: novoUsuario.id_autenticacao,
          nome: nome,
          email: novoUsuario.login,
          role: novoUsuario.role
        },
        token
      });

    } catch (err) {
      if (err.code === 'E_UNIQUE') {
        return res.conflict({ message: 'Email já cadastrado.' });
      }

      sails.log.error('Erro no cadastro:', err);
      return res.serverError({ message: 'Erro ao registrar usuário.' });
    }
  }

};
