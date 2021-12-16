const { query } = require("express-validator");

const { authToken } = require("../../../middlewares/authToken");
const { differentUserToFollow, alreadyFollowingUser } = require("../../../middlewares/customValidators");
const { userNotExists } = require("../../../middlewares/databaseValidators");
const { fieldValidation } = require("../../../middlewares/fieldValidation");

const FollowUserValidators = [
    authToken,
    query("followId").isMongoId(),
    query("followId").custom(userNotExists),
    fieldValidation,
    differentUserToFollow,
    alreadyFollowingUser
];

module.exports = FollowUserValidators;
