const Review = require('../models/review/');
const Recipe = require('../models/recipe/');
const uploadReviewImages = require('../models/review/image-upload');
const path = require('path');
const fs = require('fs');

const removeImage = async ( imagePath ) => {
    await fs.unlink(imagePath,async (err) => {
        if( err )
            console.log(err);
    });
}

module.exports.addReview = async (req,res) => {
    try{
        uploadReviewImages(req,res,async function(err){
            if(err){
                throw new Error(error.message || 'Review upload error')
            }
            const {title,description,rating,recipe,user} = req.body;
            const reviewExists = await Review.findOne({ 
                recipe,
                user
            });
            if( reviewExists ){
                if( req.files && req.files.length > 0){
                    for( const file of req.files ){
                        await removeImage(
                            path.join(__dirname,'..','uploads','review',file.filename)
                        )
                    }
                }
                return res.status(401).json({
                    message : 'You have already reviewed it'
                })
            }
            const images = req.files.map(file => {
                return path.join('/uploads','review',file.filename);
            });
            const review = await Review.create({
                user , description , title , rating , recipe , images
            });
            return res.status(200).json({
                message : 'Add Review',
                review
            });
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message : 'Something went wrong!'
        });
    }
}