const express = require('express');
const router = express.Router();
const Reviews = require('../../services/Reviews')

// Get all Reviews
router.get('/', (req, res) => res.json(Reviews))

// Get Single Review
router.get('/:id', (req, res) => {
    // check if id is equal to the index number
    const review = Reviews.some(review => review.index === parseInt(req.params.id));

    // checks if user is not true return 404 error else return user information  
    (!review) ? (res.status(404).send('Review not found')) : (res.send(Reviews.filter(review => review.index === parseInt(req.params.id))))

})

module.exports = router;