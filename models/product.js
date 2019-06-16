// mongoose export
const mongoose = require('mongoose');
const Joi =require('joi')

const productSchema = new mongoose.Schema({
    index: Number,
    isAvailable: Boolean,
    image: String,
    productName: String,
    price: Number,
    company: String,
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
    }
})

const Product = mongoose.model('Product', productSchema);




function validateProduct(product) {
    const schema = {
        name: Joi.string().min(3).required(),
        category: Joi.string(),
        isAvailable: Joi.boolean()
    };

    return Joi.validate(product, schema);
}

module.exports.validate = validateProduct;
module.exports.Product = Product;