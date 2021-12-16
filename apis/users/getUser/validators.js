const { param, query } = require("express-validator");

const { userNotExists } = require("../../../middlewares/databaseValidators");
const { fieldValidation } = require("../../../middlewares/fieldValidation");

const GetUserValidators = [
    param("id").isMongoId(),
    param("id").custom(userNotExists),
    query('followers').optional().isBoolean(),
    query('following').optional().isBoolean(),
    fieldValidation
];

module.exports = GetUserValidators;
