// Get models and validation from models
const {
    User,
    validate
} = require('../../models/user')

const express = require('express');
const router = express.Router();

// Get user service
const Users = require('../../services/Users');
const Products = require('../../services/Products');
const Reviews = require('../../services/Reviews');


// Get all users
router.get('/', async (req, res) => {
    const users = await User.find()
    res.send(users)
});

// Get Single Member 
router.get('/:id', (req, res) => {
    // check is id is equal to the index number
    const user = Users.some(user => user.index === parseInt(req.params.id));

    // checks if user is not true return 404 error else return user information  
    !user ?
        res.status(404).send('User not found') :
        res.send(Users.filter(user => user.index === parseInt(req.params.id)))

})

router.get('/:id/review', (req, res) => {
    // check if id is equal to the index number
    const user = Users.filter((user) => user.index === parseInt(req.params.id));
    const reviews = Reviews.some((review) => user[0]._id === review.userId);

    // checks if review is not true return 404 error else return user information
    !reviews ?
        res.status(404).send('review not found') :
        res.send(Reviews.filter((review) => user[0]._id === review.userId));
});

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = new User({
        picture: 'http://placehold.it/50x50',
        pictureLG: 'http://placehold.it/500x500',
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        phone: req.body.phone
    })
    user = await user.save();
    res.send(user)
})



module.exports = router;