const { authToken } = require("../../../middlewares/authToken");

const DeleteUserValidators = [
    authToken
];

module.exports = DeleteUserValidators;
