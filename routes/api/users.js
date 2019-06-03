const express = require('express');
const router = express.Router();
const Users = require('../../services/Users')

router.use(express.json());

// Get all users
router.get('/', (req, res) => res.json(Users))

// Get Single Member 
router.get('/:id', (req, res) => {
    // check is id is equal to the index number
    const user = Users.some(user => user.index === parseInt(req.params.id));

    // checks if user is not true return 404 error else return user information  
    (!user) ? (res.status(404).send('User not found')) : (res.send(Users.filter(user => user.index === parseInt(req.params.id))))

})




module.exports = router;