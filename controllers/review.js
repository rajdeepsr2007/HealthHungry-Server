const Review = require('../models/review/');
const Recipe = require('../models/recipe/');
const User = require('../models/user/');
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
            let userId = user;
            if( user.includes('@') ){
                const userObject = await User.findOne({ email : user });
                userId = userObject._id;
            }
            const reviewExists = await Review.findOne({ 
                recipe,
                userId
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
            let images = [];
            if(req.files)
            images = req.files.map(file => {
                return path.join('/uploads','review',file.filename);
            });
            const review = await Review.create({
                user : userId , description , title , rating , recipe , images
            });
            const recipeObject = await Recipe.findOne( {recipe} );
            if( recipeObject ){
                recipeObject.reviews.push(review._id);
                recipeObject.save();
            }else{
                await Recipe.create({
                    recipe , reviews : [review._id]
                });
            }
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

module.exports.getReviews = async (req , res) => {
    try{
        const recipeId = req.params.id;
        const recipe = await Recipe.findOne( {recipe : recipeId } )
                                   .populate({ path : 'reviews' , populate : { path : 'user' } });
        return res.status(200).json({
            message : 'Recipe Reviews',
            reviews : recipe.reviews
        });
    }catch(error){
        return res.status(500).json({
            message : 'Something went wrong!'
        })
    }
}