const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    recipe:{
        type : String,
        required : true
    },
    reviews:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
});

const Recipe = mongoose.model('Recipe',recipeSchema);
module.exports = Recipe;