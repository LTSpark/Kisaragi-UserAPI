const { body } = require('express-validator');

const { fieldValidation } = require('../../../middlewares/fieldValidation');
const { authToken } = require('../../../middlewares/authToken');

const PutUserValidators = [
    authToken,
    body('description').optional().notEmpty().trim(),
    body('password').optional().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    fieldValidation
];

module.exports = PutUserValidators;
