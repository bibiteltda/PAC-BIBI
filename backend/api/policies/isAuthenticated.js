const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {return res.unauthorized({ message: 'Token não fornecido.' });}

    const token = authHeader.split(' ')[1];
    if (!token) {return res.unauthorized({ message: 'Token inválido.' });}

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'chave_super_segura');
    req.user = decoded;

    return proceed();
  } catch (unusedErr) {
    return res.unauthorized({ message: 'Token inválido ou expirado.' });
  }
};