const rateLimit = require('express-rate-limit');

exports.generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Min
    max: 100,
    message: 'Zu viele Requests von dieser IP, bitte versuche es später nochmal',
    standardHeaders: true,
    legacyHeaders: false,
});

exports.authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Zu viele Login-Versuche, bitte warte 15 Minuten',
    standardHeaders: true,
    legacyHeaders: false,
});