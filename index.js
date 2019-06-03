const express = require('express')

// assign express to app
const app = express();


app.use('/api/users', require('./routes/api/users'));


// creating a port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));