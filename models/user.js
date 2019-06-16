const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    index: Number,
    picture: String,
    pictureLG: String,
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    email: String,
    phone: Number,
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        userName: Joi.string().required(),
        email: Joi.string(),
        phone: Joi.number()
    };
    return Joi.validate(user, schema);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;