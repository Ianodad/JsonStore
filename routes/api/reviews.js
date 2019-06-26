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

const auth = require('../../middleware/auth')
const admin = require('../../middleware/admin')

const express = require('express');
const router = express.Router();
const Reviews = require('../../services/Reviews')
const Fawn = require('fawn');


// Get all Reviews
router.get('/', async (req, res) => {
    const review = await Review
        .find()
        .populate('product user', 'productName userName')
        .sort({
            index: 1
        });
    res.send(review)
})

// Get Single Review
router.get('/:id', async (req, res) => {

    const review = await Review.findById(req.params.id)

        // checks if user is not true return 404 error else return user information  
        !review ?
        res.status(404).send('Review not found') :
        res.send(review);

})

// create member
router.post('/', auth, async (req, res) => {

    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Get the user id from user mongodb
    const user = await User.findById(req.body.user)
    if (!user) return res.status(400).send('Invalid user.');

    // Get review product from mongodb
    const product = await Product.findById(req.body.product);
    if (!product) return res.status(400).send('Invalid product.');

    try {
        let review = new Review({
            title: req.body.title,
            review: req.body.review,
            like: 0,
            dislike: 0,
            date: Date(Date.now()),
            user: user.id,
            product: product.id,
        });

        review = await review.save();
        product.reviews.push(review)
        product.save();

        res.send(review)
    } catch (ex) {
        res.send(ex.message)
    }
});

// Delete review
router.delete('/:id', admin, async (req, res) => {
    const review = await Review.findByIdAndRemove(req.params.id);

    if (!review) return res.status(404).send('The review with the given ID was not found.');

    res.send(review);
});

module.exports = router;