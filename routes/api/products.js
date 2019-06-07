const express = require('express');
const router = express.Router();

// Get user service
const Products = require('../../services/Products');
const Users = require('../../services/Users');
const Reviews = require('../../services/Reviews');

// Get all Products
router.get('/', (req, res) => res.json(Products));

// Get product
router.get('/:id', (req, res) => {
    // check if id is equal to the index number
    const product = Products.some((product) => product.index === parseInt(req.params.id));
    // checks if product is not true return 404 error else return user information
    !product ?
        res.status(404).send('Product not found') :
        res.send(Products.filter((product) => product.index === parseInt(req.params.id)));
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

module.exports = router;