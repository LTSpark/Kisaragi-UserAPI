const FollowService = require("../../../services/follow.services");
const { errorResponse, customResponse } = require("../../../utils/responses");

const FollowUserService = async ( req, res ) => {
    const userId = req.user.id;
    const { followId } = req.query;
    try {
        FollowService.followUser(userId, followId);
        return customResponse(res, "Following user done!", 200);
    }
    catch(error) {
        console.error(error);
        return errorResponse(res, "Following user failed", error.message);
    }
}

module.exports = FollowUserService;
