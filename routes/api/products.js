//Export models modules
const {
    Product,
    validate
} = require('../../models/product');
const auth = require('../../middleware/auth')
const admin = require('../../middleware/admin')
// mongoose export
const mongoose = require('mongoose');
// express export
const express = require('express');
const router = express.Router();
// Get user service
// const Products = require('../../services/Products');
// const Users = require('../../services/Users');
// const Reviews = require('../../services/Reviews');


// Get all Products
router.get('/',  async (req, res) => {
    const products = await Product.find().sort({
        index: 1
    });

    res.send(products)
});

// Get product
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    // console.log(product)

        !product ?
        res.status(404).send('Product not found') :
        res.send(product);
});

router.get('/:id/review', async (req, res) => {
   
    const product = await Product.findById(req.params.id);

    // console.log(product.reviews)

        !product.reviews ?
        res.status(404).send('Product not found') :
        res.send(product.reviews);
});

router.post('/', auth, async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // save from body
    let product = new Product({
        isAvailable: true,
        image: "http://placehold.it/250x250",
        imageLg: "http://placehold.it/1080x1080",
        productName: req.body.productName,
        price: req.body.price,
        company: req.body.company,
        category: req.body.category,
        quantity: req.body.quantity,
        description: req.body.description,
        reviews: []
    })
    // save product
    product = await product.save();
    res.send(product)
    res.status(500).send(ex.message)

})
// delete product
router.delete('/:id', admin, async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product) return res.status(404).send('The product with the given ID was not found.');

    res.send(product);
});

module.exports = router;