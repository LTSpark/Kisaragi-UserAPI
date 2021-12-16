const mongoose = require("mongoose");
const User = require("../schemas/User");

class FollowService {

    async followUser(userId, followId) {
        const session = await User.startSession();
        session.startTransaction();
        await User.updateOne({ _id: userId }, {
            $addToSet: {
                following: followId
            }
        }, { session: session }).exec();
        await User.updateOne({ _id: followId }, {
            $addToSet: {
                followers: userId
            }
        }, { session: session }).exec();
        await session.commitTransaction();
        session.endSession();
    }

    async unfollowUser(userId, unfollowId) {
        const session = await User.startSession();
        session.startTransaction();
        await User.updateOne({ _id: userId }, {
            $pull: {
                following: unfollowId
            }
        }, { session: session }).exec();
        await User.updateOne({ _id: unfollowId }, {
            $pull: {
                followers: userId
            }
        }, { session: session }).exec();
        await session.commitTransaction();
        session.endSession();
    }

}

const followService = new FollowService();

module.exports = followService;
