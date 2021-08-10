const multer = require('multer');
const path = require('path');
const imagePath = path.join('uploads','review/');

let storage = multer.diskStorage({
    destination : function(req , file , cb){
        cb(null,path.join(__dirname,'..','..',imagePath))
    },
    filename : function( req , file , cb ){
        const suffix = Date.now();
        cb(null,file.fieldname+suffix+file.originalname);
    }
});

const uploadReviewImages = multer({ storage : storage }).array('images',5);

module.exports = uploadReviewImages;