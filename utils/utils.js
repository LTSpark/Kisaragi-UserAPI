const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validImageExtensions = [ 'jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];

const encryptPassword = password => {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(password, salt);
}

const generateJWT = ( user ) => {
    return new Promise((resolve, reject) => {
        const { id, name } = user;
        const payload = { id, name };
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: process.env.EXPIRATION_DATE
        }, (err, token) => {
            if (err) {
                reject("Couldn't generate token");
            } else {
                resolve(token);
            }
        });
    });
}

const fileToBase64 = ( mimetype, buffer ) => {
    const base64Buffer = Buffer.from(buffer).toString('base64');
    return 'data:' + mimetype + ';base64,' + base64Buffer;
}

const parseSort = ( sort, order) => {
    if(order == 'desc') {
        sort = "-" + sort;
    }
    return sort;
}

const errorFactory = ( msg, statusCode ) => {
    const error = new Error(msg);
    error.code = statusCode;
    return error;
}

const imageExtensionValidator = fileName => {

    let extension = fileName.split('.');
    extension = extension[extension.length -1];

    if(validImageExtensions.includes(extension)){
        return true;
    }

}

module.exports = {
    encryptPassword,
    generateJWT,
    fileToBase64,
    errorFactory,
    parseSort,
    imageExtensionValidator
};
