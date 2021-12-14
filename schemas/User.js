const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
});

UserSchema.methods.toJSON = function () {
    const { _id, ...user } = this.toObject();
    user.userId = _id;
    return user;
}

module.exports = model('User', UserSchema);