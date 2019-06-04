const express = require('express');
const router = express.Router();


// Get user service
const users = require('../services/Users');



// Store page 
router.get('/', (req, res) => res.render('store', {
    title: 'Store View',
    users

}))

module.exports = router;