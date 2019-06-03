const express = require('express')

// assign express to app
const app = express();

// route for the users
app.use('/api/users', require('./routes/api/users'));

// route for the reviews
app.use('/api/reviews', require('./routes/api/reviews'));

// route for the products
app.use('/api/products', require('./routes/api/products'));

// creating a port
const PORT = process.env.PORT || 5000;

// env define log
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app environment: ${app.get('env')}`);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));