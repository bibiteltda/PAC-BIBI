const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ msg: 'Nenhum token, autorização negada.' });
    }

    const token = authHeader.split(' ')[1]; // Formato "Bearer TOKEN"
    if (!token) {
        return res.status(401).json({ msg: 'Formato de token inválido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Adiciona o payload do user (id, role) na requisição
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token inválido.' });
    }
};