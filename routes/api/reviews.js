const express = require('express');
const router = express.Router();
const Reviews = require('../../services/Reviews')

// Get all Reviews
router.get('/', (req, res) => res.json(Reviews))



module.exports = router;