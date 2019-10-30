const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({

    categoryName: {
        type: String,
        minlength: 5,
        maxlength:50,
        required: true,
    }
})

const Category = mongoose.model('Category', categorySchema);




function validateCategory(category) {
    const schema = {
        categoryName: Joi.string().min(5).max(50).required()
    };

    return Joi.validate(category, schema);
}

module.exports.validate = validateCategory;
module.exports.Category = Category;