const winston = require('winston');
const mongoose = require('mongoose');

const config = {
    useNewUrlParser: true,
    useCreateIndex: true
}
module.exports = function () {
    mongoose
        .connect('mongodb://localhost/jsonstore', config)
        .then(() => winston.info('Connected to MongoDB....'))
}