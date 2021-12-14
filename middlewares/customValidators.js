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

module.exports = {
    fileValidator,
    imageExtensionMiddleware
}