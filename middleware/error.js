const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function (err, req, res, next) {
    winston.error(err.message, err);

    // error
    // warm
    //info
    //debug
    // silly
    res.status(500).send("connection failed")

}