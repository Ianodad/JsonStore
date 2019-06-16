//Export models modules
const {
    Product,
    validate
} = require('../../models/product');
// mongoose export
const mongoose = require('mongoose');
// express export
const express = require('express');
const router = express.Router();
// Get user service
const Products = require('../../services/Products');
const Users = require('../../services/Users');
const Reviews = require('../../services/Reviews');



// Get all Products
router.get('/', async (req, res) => {
    const products = await Product.find().sort({
        index: 1
    });

    res.send(products)
});

// Get product
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    console.log(product)
        // // check if id is equal to the index number
        // const product = Products.some((product) => product.index === parseInt(req.params.id));

        // checks if product is not true return 404 error else return user information
        !product ?
        res.status(404).send('Product not found') :
        res.send(product);
});

router.get('/:id/review', (req, res) => {
    // check if id is equal to the index number
    const product = Products.filter((product) => product.index === parseInt(req.params.id));
    const reviews = Reviews.some((review) => product[0]._id === review.productId);

    console.log(reviews)
        // checks if review is not true return 404 error else return user information
        !reviews ?
        res.status(404).send('review not found') :
        res.send(Reviews.filter((review) => product[0]._id === review.productId));
});

router.post('/', async (req, res)=> {
   const {
       error
   } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   let product = new Product({
       
   })
})

module.exports = router;