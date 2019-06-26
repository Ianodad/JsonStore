const error = require('./middleware/error')
const express = require('express')
// middleware that logs request
const morgan = require('morgan')
// assign express to app
const app = express();

require('./startup/routes')(app);
require('./startup/logging')();
require('./startup/db')()
require('./startup/config')();


// creating a port
const PORT = process.env.PORT || 5000;

console.log(`Application environment: ${app.get('env')}`);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));