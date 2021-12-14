const { param } = require("express-validator");

const { userNotExists } = require("../../../middlewares/databaseValidators");
const { fieldValidation } = require("../../../middlewares/fieldValidation");

const GetUserValidators = [
    param("id").isMongoId(),
    param("id").custom(userNotExists),
    fieldValidation
];

module.exports = GetUserValidators;
