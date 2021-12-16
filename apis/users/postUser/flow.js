const UserService = require("../../../services/user.services");

const { cloudinaryImageUpload } = require("../../../utils/cloudinaryImageUpload");
const { encryptPassword, generateJWT } = require("../../../utils/utils");
const { errorResponse } = require("../../../utils/responses");

const PostUserFlow = async (req, res) => {

    const { name, email } = req.body;
    const password = encryptPassword(req.body.password);

    try{

        const profileImage = await cloudinaryImageUpload(req.files.file, "Kisaragi");
        const user = await UserService.save(name, email, password, profileImage);
        const token = await generateJWT(user.id);

        return res.status(201).json({
            ok: true,
            msg: "User created successfully",
            token,
            user
        });
        
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "User creation failed");
    }

}

module.exports = PostUserFlow;

