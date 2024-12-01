import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY'); // Usa la misma clave secreta
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token inválido o expirado' });
    }
};