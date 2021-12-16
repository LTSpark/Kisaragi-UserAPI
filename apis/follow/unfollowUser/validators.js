const { query } = require("express-validator");

const { authToken } = require("../../../middlewares/authToken");
const { differentUserToUnfollow, userIsNotFollowed } = require("../../../middlewares/customValidators");
const { userNotExists } = require("../../../middlewares/databaseValidators");
const { fieldValidation } = require("../../../middlewares/fieldValidation");

const UnfollowUserValidators = [
    authToken,
    query("unfollowId").isMongoId(),
    query("unfollowId").custom(userNotExists),
    fieldValidation,
    differentUserToUnfollow,
    userIsNotFollowed
];

module.exports = UnfollowUserValidators;
