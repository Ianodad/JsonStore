const mongoose = require('mongoose');
const Joi = require('joi');

const companySchema = new mongoose.Schema({

    companyName: {
        type: String,
        required: true,
    }
})

const Company = mongoose.model('Company', companySchema);




function validateCompany(company) {
    const schema = {
        companyName: Joi.string().required()
    };

    return Joi.validate(company, schema);
}

module.exports.validate = validateCompany;
module.exports.Company = Company;