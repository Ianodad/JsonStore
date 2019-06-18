// Get product models
const {
    Review,
    validate
} = require('../../models/review');

// get product models
const {
    Product
} = require('../../models/product')

// Get user model
const {
    User
} = require('../../models/user');

const express = require('express');
const router = express.Router();
const Reviews = require('../../services/Reviews')
const Fawn = require('fawn');


// Get all Reviews
router.get('/', (req, res) => {
    res.send(Review)
})

// Get Single Review
router.get('/:id', (req, res) => {
    // check if id is equal to the index number
    const review = Reviews.some(review => review.index === parseInt(req.params.id));

    // checks if user is not true return 404 error else return user information  
    (!review) ? (res.status(404).send('Review not found')) : (res.send(Reviews.filter(review => review.index === parseInt(req.params.id))))

})

// create member
router.post('/', async (req, res) => {

    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Get the user id from user mongodb
    const user = await User.findById(req.body.userId)
    if (!user) return res.status(400).send('Invalid user.');

    // Get review product from mongodb
    const product = await Product.findById(req.body.productId);
    if (!product) return res.status(400).send('Invalid product.');

    try {
        let review = new Review({
            title: req.body.title,
            review: req.body.review,
            like: 0,
            dislike: 0,
            date: Date(Date.now()),
            userId: user.id,
            productId: product.id,
        });
        res.send(review)
    } catch (ex) {
        res.send(ex.message)
    }

    


});

module.exports = router;