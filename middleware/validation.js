const { body, validationResult } = require('express-validator');

exports.registerValidation = [
    body('username')
        .isLength({ min: 3, max: 20 })
        .withMessage('Username muss 3-20 Zeichen lang sein'),
    body('email')
        .isEmail()
        .withMessage('Must be a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
];

exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};