const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; //man muss spittten da Bearer drin ist und den braucht man nicht
    if (!token) {
        return res.status(401).json({ error: "Kein Token" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Token ungültig" });
        } else {
            req.userId = decoded.id;  // Jetzt hat der Controller Zugriff!
            next();
        }
    });
};

module.exports = authMiddleware;