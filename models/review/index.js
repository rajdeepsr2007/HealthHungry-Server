const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    recipe : {
        type: String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    images : [
        {
            type : String
        }
    ],
    rating : {
        type : String,
        required : true
    },title : {
        type : String,
        required : true
    }
},{
    timestamps : true
});

const Review = mongoose.model('Review' , reviewSchema);

module.exports = Review;