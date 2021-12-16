const FollowService = require("../../../services/follow.services");
const { errorResponse, customResponse } = require("../../../utils/responses");

const UnfollowUserService = async ( req, res ) => {
    const userId = req.user.id;
    const { unfollowId } = req.query;
    try {
        FollowService.unfollowUser(userId, unfollowId);
        return customResponse(res, "Unfollowing user done!", 200);
    }
    catch(error) {
        console.error(error);
        return errorResponse(res, "Unfollowing user failed", error.message);
    }
}

module.exports = UnfollowUserService;
