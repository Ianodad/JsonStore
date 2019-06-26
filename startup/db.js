const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    mongoose
        .connect('mongodb://localhost/jsonstore', {
            useNewUrlParser: true
        })
        .then(() => console.log('Connected to MongoDB....'))
}