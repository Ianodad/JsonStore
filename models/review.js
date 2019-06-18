const Joi = require('joi');
const mongoose = require('mongoose');
const {
    userSchema
} = require('./user');

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    review: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    like: {
        type: Number,

    },
    dislike: {
        type: Number,
    },
    datePublished: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    }
});

const Review = mongoose.model('Review', reviewSchema)

function validateReview(review) {
    const schema = {
        title: Joi.string().required(),
        review: Joi.string().required(),
        like: Joi.number(),
        dislike: Joi.number(),
        userId: Joi.string().required(),
        productId: Joi.string().required()
    };

    const options = {
        abortEarly: false
    }
    return Joi.validate(review, schema, options);
}

exports.reviewSchema = reviewSchema;
exports.Review = Review;
exports.validate = validateReview;