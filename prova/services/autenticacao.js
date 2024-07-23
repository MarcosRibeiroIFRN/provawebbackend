const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).json({ message: 'Token negado!!!' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Falha na autenticação do token' });

        req.userId = decoded.id;
        next();
    });
};
