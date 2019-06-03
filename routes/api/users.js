const express = require('express');
const router = express.Router();
const Users = require('../../services/Users')

// Get all users
router.get('/', (req, res) => res.json(Users))





module.exports = router;