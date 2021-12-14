const UserService = require("../../../services/user.services");
const { errorResponse, customResponse } = require("../../../utils/responses");

const DeleteUserFlow = async ( req, res ) => {
    try {
        UserService.deleteUser(req.user.id);
        return customResponse(res, "User deleted successfully");
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Deleting user failed", error.message);
    }
}

module.exports = DeleteUserFlow;
