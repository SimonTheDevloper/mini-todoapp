const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "kein AccesToken" });
    }
    const token = authHeader.split(' ')[1]; //man muss spittten da Bearer drin ist und den braucht man nicht

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;  // Jetzt hat der Controller Zugriff!
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Acces-Token-Abgelaufen" });
        }
        return res.status(401).json({ error: "Token ungültig" });
    }
};

module.exports = authMiddleware;