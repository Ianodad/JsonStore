const validateObjectId = require('../../middleware/validateObjectId')

const {
    Category,
    validate
} = require('../../models/category');
const auth = require('../../middleware/auth')
const admin = require('../../middleware/admin')
// mongoose export
const mongoose = require('mongoose');
// express export
const express = require('express');
const router = express.Router();

// Get all Categories
router.get('/', async (req, res) => {
    const categories = await Category.find().sort({
        index: 1
    });
    res.send(categories)
});

// Get category
router.get('/:id', validateObjectId, async (req, res) => {

    const category = await Category.findById(req.params.id);

    !category ?
        res.status(404).send('Category not found') :
        res.send(category);
});

router.post('/', auth, async (req, res) => {
    const {error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // save from body
    let category = new Category({
        categoryName: req.body.categoryName
    })
    // save  category
    category = await category.save();
    res.send(category)

})

module.exports = router;