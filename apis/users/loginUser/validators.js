const { body } = require('express-validator');

const { fieldValidation } = require('../../../middlewares/fieldValidation');

const LoginUserValidators = [
    body('email').isEmail(),
    body('password').not().isEmpty(),
    fieldValidation
];

module.exports = LoginUserValidators;
