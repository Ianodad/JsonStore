const express = require('express');
const router = express.Router();
const Products = require('../../services/Products')

// Get all Products
router.get('/', (req, res) => res.json(Products))



module.exports = router;