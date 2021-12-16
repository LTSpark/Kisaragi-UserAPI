const User = require("../schemas/User");
const { customErrorResponse } = require('../utils/responses');

const validImageExtensions = [ 'jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];

const fileValidator = (req, res, next) => {
    if(!req.files) {
        return customErrorResponse(res, "File not sent", 400);
    }
    if(!req.files.file){
        return customErrorResponse(res, "File not sent correctly", 400);
    }
    next();
}

const imageExtensionMiddleware = (req, res, next) => {

    let extension = req.files.file.name.split('.');
    extension = extension[extension.length -1];

    if(!validImageExtensions.includes(extension)){
        return customErrorResponse(res, "Invalid extension", 400);
    }

    next();

}

const differentUserToFollow = (req, res, next) => {
    if(req.user.id == req.query.followId){
        return customErrorResponse(res, "You cannot follow yourself", 403);
    }
    next();
}

const differentUserToUnfollow = (req, res, next) => {
    if(req.user.id == req.query.unfollowId){
        return customErrorResponse(res, "You cannot unfollow yourself", 403);
    }
    next();
}

const isFollowingQuery = async ( userId, operationalId) => {
    return User.findOne({
        _id: userId,
        following: {
            $in: [operationalId]
        }
    }).exec();
}

const alreadyFollowingUser = async (req, res, next) => {

    const { followId } = req.query;
    const user = req.user;

    const userFollowed = await isFollowingQuery(user.id, followId);

    if (userFollowed) {
        return customErrorResponse(res, "Already following user", 400);
    }

    next();

}

const userIsNotFollowed = async (req, res, next) => {

    const { unfollowId } = req.query;
    const user = req.user;

    const userToUnfollow = await isFollowingQuery(user._id, unfollowId);

    if (!userToUnfollow) {
        return customErrorResponse(res, "Cannot unfollow user who you are not following", 400);
    }

    next();

}

module.exports = {
    fileValidator,
    imageExtensionMiddleware,
    differentUserToFollow,
    differentUserToUnfollow,
    alreadyFollowingUser,
    userIsNotFollowed
}