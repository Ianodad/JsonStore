const express = require('express');
const router = express.Router();
const Reviews = require('../../services/Reviews')
const alphanumeric = require('alphanumeric-id');
const Joi = require('joi');

// Get all Reviews
router.get('/', (req, res) => res.json(Reviews))

// Get Single Review
router.get('/:id', (req, res) => {
    // check if id is equal to the index number
    const review = Reviews.some(review => review.index === parseInt(req.params.id));

    // checks if user is not true return 404 error else return user information  
    (!review) ? (res.status(404).send('Review not found')) : (res.send(Reviews.filter(review => review.index === parseInt(req.params.id))))

})

// create member
router.post('/', (req, res) => {

    // Joi schema to set prerequisites  of content 
    const schema = {
        title: Joi.string().min(3).required(),
        review: Joi.string().min(10).required(),
        username: Joi.string().required()
    }

    const options = {
        abortEarly: false
    };

    // check validation againt  the schema
    const result = Joi.validate(req.body, schema, options)


    const newReview = {
        _id: alphanumeric(15),
        index: Reviews.length,
        title: req.body.title,
        review: req.body.review,
        username: req.body.username,
        like: 0,
        dislike: 0,
        date: Date(Date.now())
    }

    if (result.error)(res.status(400).send(result.error.details.map(m => m.message)))

    Reviews.push(newReview)
    res.send(Reviews)

});

module.exports = router;