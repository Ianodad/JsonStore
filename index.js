const express = require('express')
// middleware that logs request
const morgan = require('morgan')
// assign express to app
const app = express();


// MIDDLEWARE    //
// logs of request sent to the server
app.use(morgan('tiny'));

// MIDDLEWARE -END ///

// API ROUTING  /////

// route for the users
app.use('/api/users', require('./routes/api/users'));

// route for the reviews
app.use('/api/reviews', require('./routes/api/reviews'));

// route for the products
app.use('/api/products', require('./routes/api/products'));

/////    API ROUTING -END   /////

// creating a port
const PORT = process.env.PORT || 5000;

// env define log
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`Application environment: ${app.get('env')}`);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));