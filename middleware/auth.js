const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({ error: "kein AccesToken" });
    }
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