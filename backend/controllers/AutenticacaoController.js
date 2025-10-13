import bcrypt from 'bcrypt';
import { models } from '../database/index.js'; 

function validarForcaSenha(senha) {
  const minLength = senha.length >= 6;
  const hasUpper = /[A-Z]/.test(senha);
  const hasLower = /[a-z]/.test(senha);
  const hasNumber = /\d/.test(senha);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
  return minLength && hasUpper && hasLower && hasNumber && hasSpecial;
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return regex.test(email);
}

const AutenticacaoController = {
  async create(req, res) {
    try {
      const { email, senha, confirmarSenha } = req.body;

      if (!email || !senha || !confirmarSenha) {
        return res.status(400).json({ erro: 'Email, senha e confirmação de senha são obrigatórios.' });
      }
      if (senha !== confirmarSenha) {
        return res.status(400).json({ erro: 'As senhas não coincidem.' });
      }
      if (!validarEmail(email)) {
        return res.status(400).json({ erro: 'O formato do email é inválido.' });
      }
      if (!validarForcaSenha(senha)) {
        return res.status(400).json({ erro: 'A senha é fraca. Precisa ter no mínimo 6 caracteres, incluindo maiúscula, minúscula, número e caractere especial.' });
      }

      // Criptografa a senha
      const senhaHash = await bcrypt.hash(senha, 10);
      const novoUsuario = await models.Autenticacao.create({
        login: email,
        senha: senhaHash,
        role: 'pendente'
      });

      const usuarioLimpo = {
        id_autenticacao: novoUsuario.id_autenticacao,
        login: novoUsuario.login,
        role: novoUsuario.role
      };

      res.status(201).json(usuarioLimpo);

    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ erro: 'Este email já está cadastrado.' });
      }
      console.error('Erro ao criar conta de autenticação:', error);
      res.status(500).json({ erro: 'Ocorreu um erro no servidor ao criar a conta.' });
    }
  },

  async findAll(req, res) {
    try {
      const lista = await models.Autenticacao.findAll({ attributes: { exclude: ['senha'] } });
      res.json(lista);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async findOne(req, res) { /* ...código original... */ },
  async update(req, res) { /* ...código original... */ },
  async delete(req, res) { /* ...código original... */ }
};

export default AutenticacaoController;