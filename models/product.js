// mongoose export
const mongoose = require('mongoose');
const Joi = require('joi');
const {
    reviewSchema
} = require('./review')

const productSchema = new mongoose.Schema({
    index: Number,
    isAvailable: Boolean,
    image: String,
    imageLg: String,
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Phone', 'Television', 'Laptop', 'VGA']
    },
    quantity: Number,
    ratings: Number,
    description: String,
    registered: {
        type: Date,
        default: Date.now
    },
    reviews: [reviewSchema]
})

const Product = mongoose.model('Product', productSchema);




function validateProduct(product) {
    const schema = {
        productName: Joi.string().min(3).required(),
        category: Joi.string(),
        isAvailable: Joi.boolean(),
        price: Joi.number(),
        company: Joi.string(),
        category: Joi.string(),
        quantity: Joi.number(),
        description: Joi.string()
    };

    return Joi.validate(product, schema);
}

module.exports.validate = validateProduct;
module.exports.Product = Product;