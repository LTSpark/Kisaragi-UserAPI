const UserService = require("../../../services/user.services");
const { errorResponse, customResponse } = require("../../../utils/responses");

const LoginUserFlow = async(req, res) => {
    try {
        const { email, password } = req.body;
        const{ user, token } = await UserService.login(email, password);
        return res.status(200).json({
            ok: true,
            msg: "User login success",
            token,
            user
        });
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "User login failed", error.message, error.code || 500);
    }
}

module.exports = LoginUserFlow;