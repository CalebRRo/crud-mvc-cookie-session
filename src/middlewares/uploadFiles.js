const multer = require("multer");
const path = require("path");

/* image product */
const storageImageProduct = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null,"./public/images/products")
    },
    filename : (req,file,callback) => {
        callback(null,"product-" + Date.now() + path.extname(file.originalname))
    }

});

const uploadImageProduct = multer({
    storage : storageImageProduct
});

/* image user */
const storageImageUser = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/images/avatars' )
    },
    filename : (req,file,callback) => {
        callback(null,'user-' + Date.now() + path.extname(file.originalname))
       
    }
});

const uploadImageUser = multer({
    storage : storageImageUser
});

module.exports = {
    uploadImageProduct,
    uploadImageUser
}

