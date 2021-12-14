const UserService = require("../../../services/user.services");

const { imageExtensionValidator } = require('../../../utils/utils');
const { errorResponse, customErrorResponse, customResponse } = require("../../../utils/responses");

const PutUserFlow = async ( req, res ) => {

    const { description, password } = req.body;
    let fileImage = '';

    if(req.files){
        if(!imageExtensionValidator(req.files.file.name)) {
            return customErrorResponse(res, "Invalid image extension", 401);
        }   
        fileImage = req.files.file;
    }

    try {
        UserService.updateUser(req.user.id, description, password, fileImage);
        return customResponse(res, "Updated user successfully");
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Updating user failed", error.message);
    }

}

module.exports = PutUserFlow;
