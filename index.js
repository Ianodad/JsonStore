require('express-async-errors');
const winston = require('winston');
require('winston-mongodb')
const config = require('config');
const error = require('./middleware/error')
const express = require('express')
// middleware that logs request
const morgan = require('morgan')
// assign express to app
const app = express();

require('./startup/routes')(app);
require('./startup/db')()
// get helper functions
const hbs = require('./helpers')

// process.on('uncaughtException', ex => {
//     winston.error(ex.message, ex);
//     process.exit(1);
// });

winston.handleExceptions(
    new winston.transports.File({
        filename: 'uncaughtExceptions.log'
    })
)
process.on('unhandledRejection', ex => {
    throw ex
});


winston.add(winston.transports.File, {
    filename: 'logfile.log'
});
winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/jsonstore',
    level: 'info'
})
// // throw new Error('Something failed during startup.')
// const p = Promise.reject(new Error('Something failed badly'));
// p.then(() => console.log('Done'));

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivate is not defined.');
    process.exit(1);
}
//  HANDLEBARS ENGINE  
// setting template engine to handlebars
app.engine('handlebars', hbs.engine);
// setting up view engine
app.set('view engine', 'handlebars');

//  END- HANDLEBARS    //

// import mongoose
const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/jsonstore', {
        useNewUrlParser: true
    })
    .then(() => console.log('Connected to MongoDB....'))
    .catch((err) => console.error('Could not connect to MongoDb...', err));


// MIDDLEWARE    //

// logs of request sent to the server
// app.use(morgan('tiny'));
// Body Parser
app.use(express.json());
// handle url encoded data
app.use(express.urlencoded({
    extended: false
}));

app.use(express.static('public'));
// MIDDLEWARE -END ///


// API ROUTING  /////

// Auth //
app.use('/api/auth', require('./routes/api/auth'));

// route for the users
app.use('/api/users', require('./routes/api/users'));

// route for the reviews
app.use('/api/reviews', require('./routes/api/reviews'));

// route for the products
app.use('/api/products', require('./routes/api/products'));
/////    API ROUTING -END   /////

// ROUTING PAGES ///

app.use('/', require('./routes/home'))

app.use('/store', require('./routes/store'))

app.use('/about', require('./routes/about'))
//  END ROUTING ////

app.use(error);

// creating a port
const PORT = process.env.PORT || 5000;

// env define log
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`Application environment: ${app.get('env')}`);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));