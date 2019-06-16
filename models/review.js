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
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'

    }
});

const Review = mongoose.model('Review', reviewSchema)

function validateReview(review) {
    const schema = {
        title: Joi.string().required(),
        review: Joi.string().required()
    };

    return Joi.validate(review, schema);
}

exports.reviewSchema = reviewSchema;
exports.Review = Review;
exports.validate = validateReview;