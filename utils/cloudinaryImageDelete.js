const cloudinary = require('cloudinary').v2;

cloudinary.config( process.env.CLOUDINARY_URL );

const cloudinaryImageDelete = (imgUrl, folder) => {

    const splittedUrl = imgUrl.split('/');
    const [ name ] = splittedUrl[splittedUrl.length-1].split('.');//get public_id and  cut the extension
    cloudinary.uploader.destroy(`${folder}/${name}`);

}

module.exports = {
    cloudinaryImageDelete
};