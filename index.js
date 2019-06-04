const express = require('express')
// middleware that logs request
const morgan = require('morgan')
// assign express to app
const app = express();

const users = require('./services/Users');

// handlebars
const exhdlbrs = require('express-handlebars');


// MIDDLEWARE    //

// logs of request sent to the server
app.use(morgan('tiny'));
// Body Parser
app.use(express.json());
// handle url encoded data
app.use(express.urlencoded({
    extended: false
}));

app.use(express.static('public'));

// MIDDLEWARE -END ///


const hbs = exhdlbrs.create({
    defaultLayout: 'main',

    // create custom helpers
    helpers: {
        concat: (x, y) => `${x} ${y}`

    }
});


//  HANDLEBARS ENGINE  
// setting template engine to handlebars
app.engine('handlebars', hbs.engine);
// setting up view engine
app.set('view engine', 'handlebars');

//  END- HANDLEBARS    //

// ROUTING TEMPLATE ////
// Home page //
app.get('/', (req, res) => res.render('index', {
    title: 'JsonStore Home'
}));

// Store page 
app.get('/store', (req, res) => res.render('store', {
    title: 'Store View',
    users

}))

//  END ROUTING ////



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