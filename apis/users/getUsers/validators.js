const { query } = require('express-validator');

const { fieldValidation } = require('../../../middlewares/fieldValidation');

const GetUsersValidators = [
    query("sort").optional().isIn(["name", "id"]),
    query("order").optional().isIn(["asc", "desc"]),
    query("name").optional().notEmpty(),
    query("from", "From has to be a positive integer").optional().isInt({ min: 0 }),
    query("limit", "Limit has to be a negative integer").optional().isInt({ min: 0 }),
    fieldValidation
];

module.exports = GetUsersValidators;
