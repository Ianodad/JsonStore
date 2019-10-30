// mongoose export
const mongoose = require('mongoose');
const Joi = require('joi');
const {
    reviewSchema
} = require('./review')

const productSchema = new mongoose.Schema({
    index: Number,
    isAvailable: Boolean,
    image: {
        type: String
    },
    imageLg: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Company'
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },

    quantity: {
        type: Number,
        required: true
    },
    rating: {
        type: Number
    },
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
        image: Joi.string(),
        imageLg: Joi.string(),
        productName: Joi.string().min(3).required(),
        category: Joi.string(),
        isAvailable: Joi.boolean(),
        price: Joi.number(),
        company: Joi.string().required(),
        category: Joi.string().required(),
        quantity: Joi.number(),
        rating: Joi.number(),
        description: Joi.string()
    };

    return Joi.validate(product, schema);
}

module.exports.validate = validateProduct;
module.exports.Product = Product;