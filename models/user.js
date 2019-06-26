const Joi = require('joi');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
	index: Number,
	picture: String,
	pictureLG: String,
	firstName: {
		type: String,
		required: true,
		trim: true,
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
		maxlength: 255,
		unique: true
	},
	phone: Number,
	password: {
		type: String,
		required: true,
		minlength: 8,
		maxlength: 1024,
		unique: true
	},
	email: {
		type: String,
		required: true,
		minlength: 8,
		maxlength: 255,
		unique: true
	},
	isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign(
		{
            _id: this._id,
            isAdmin:this.isAdmin
		},
		config.get('jwtPrivateKey')
	);
	return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
	const schema = {
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		userName: Joi.string().required(),
		email: Joi.string().required().email(),
		phone: Joi.number(),
		password: Joi.string().min(5).max(255)
	};
	return Joi.validate(user, schema);
}

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;
