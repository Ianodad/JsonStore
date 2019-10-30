const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config')


const configdb = {
    useNewUrlParser: true,
    useCreateIndex: true
}
module.exports = function () {
    const db = config.get('db')
    mongoose
        .connect(db, configdb)
        .then(() => winston.info(`Connected to ${db}....`))
}