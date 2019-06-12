const express = require('express');
const router = express.Router();

// Get user service
const Users = require('../../services/Users');
const Products = require('../../services/Products');
const Reviews = require('../../services/Reviews');


// Get all users
router.get('/', (req, res) => res.json(Users))

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



module.exports = router;