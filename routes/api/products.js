const express = require('express');
const router = express.Router();
const Products = require('../../services/Products')



// Get all Products
router.get('/', (req, res) => res.json(Products))

// Get product 
router.get('/:id', (req, res) => {
    // check if id is equal to the index number
    const product = Products.some(product => product.index === parseInt(req.params.id));

    // checks if product is not true return 404 error else return user information  
    (!product) ? (res.status(404).send('Product not found')) : (res.send(Products.filter(product => product.index === parseInt(req.params.id))))

})


module.exports = router;