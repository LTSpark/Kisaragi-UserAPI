const UserService = require("../../../services/user.services");
const { errorResponse } = require("../../../utils/responses");

const GetUserFlow = async (req, res) => {
    try{
        const user = await UserService.getUserById(req.params.id);
        return res.status(201).json({
            user
        });
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Getting user failed", error.message);
    }
}

module.exports = GetUserFlow;
