const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { registerValidation, handleValidationErrors } = require('../middleware/validation');


router.post('/register',
    registerValidation,            //  Prüft Regeln
    handleValidationErrors,       //  Checkt ob Fehler da sind
    userController.createUser);  //  Wird nur ausgeführt wenn 1+2 OKuserController.createUser
router.post('/login', userController.authenticateUser);

module.exports = router;