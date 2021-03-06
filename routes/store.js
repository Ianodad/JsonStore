const express = require('express');
const router = express.Router();


// Get user service
const users = require('../services/Users');
const products = require('../services/Products')
const reviews = require('../services/Reviews')



// Store page 
router.get('/', (req, res) => res.render('store', {
    title: 'Store View',
    style: 'store.css',
    users,
    products,
    reviews

}))

module.exports = router;