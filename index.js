const winston = require('winston');
const error = require('./middleware/error');
const express = require('express');
// middleware that logs request
const morgan = require('morgan');
// assign express to app

const Cors = require('cors');

const app = express();

app.use(Cors());

// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header();
// });

require('./startup/routes')(app);
require('./startup/logging')();
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

// creating a port
const PORT = process.env.PORT || 5000;

console.log(`Application environment: ${app.get('env')}`);
const server = app.listen(PORT, () => winston.info(`Server started on port ${PORT}`));

module.exports = server;
