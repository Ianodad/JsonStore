const {
    Company,
    validate
} = require('../../models/company');
const auth = require('../../middleware/auth')
const admin = require('../../middleware/admin')
// mongoose export
const mongoose = require('mongoose');
// express export
const express = require('express');
const router = express.Router();

// Get all Companies
router.get('/', async (req, res) => {
    const companies = await Company.find().sort({
        index: 1
    });
    res.send(companies)
});

// Get company
router.get('/:id', async (req, res) => {
    const company = await Company.findById(req.params.id);

    !company ?
        res.status(404).send('Company not found') :
        res.send(company);
});

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // save from body
    let company = new Company({
        companyName: req.body.companyName
    })
    // save  company
    company = await company.save();
    res.send(company)
    res.status(500).send(ex.message)

})

module.exports = router;