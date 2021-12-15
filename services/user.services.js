const bcryptjs = require("bcryptjs");

const User = require("../schemas/User");

const { cloudinaryImageDelete } = require("../utils/cloudinaryImageDelete");
const { cloudinaryImageUpload } = require("../utils/cloudinaryImageUpload");
const { generateJWT, errorFactory, encryptPassword } = require("../utils/utils");

class UserService {

    save(name, email, password, profileImage) {
        const user = new User({ name, email, password, profileImage });
        return user.save(); 
    }

    async login(email, password) {

        const user = await User.findOne({ email }).exec();
        if(!user){
            throw errorFactory("User not found", 400);
        }

        const validPassword = bcryptjs.compareSync( password, user.password);
        if(!validPassword){
            throw errorFactory("Invalid password", 401);
        }

        return {
            user,
            token: await generateJWT(user)
        };
        
    }

    getUserById(id) {
        return User.findById(id).exec();
    }

    async getUsers(query, from, limit, sort) {
        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query).skip(from).limit(limit).sort(sort).exec()
        ]);
        return { total, users };
    }

    async deleteUser(id){
        const user = await User.findByIdAndDelete(id).exec();
        cloudinaryImageDelete(user.profileImage, "Kisaragi");
    }
    
    async updateUser(id, description, password, file){
        const user = await User.findById(id).exec();
        user.description = description;
        if(password){
            user.password = encryptPassword(password);
        }
        if(file){
            cloudinaryImageDelete(user.profileImage, "Kisaragi");
            user.profileImage = await cloudinaryImageUpload(file, "Kisaragi");
        }
        await user.save();
    }
}

const userService = new UserService();

module.exports = userService;
