const error = require('../middleware/error')
const express = require('express')

module.exports = function (app) {

    // Body Parser
    app.use(express.json());
    // API ROUTING  /////
    // Auth //
    app.use('/api/auth', require('../routes/api/auth'));
    app.use('/api/users', require('../routes/api/users'));
    app.use('/api/reviews', require('../routes/api/reviews'));
    /////    API ROUTING -END   /////

    // ROUTING PAGES ///
    app.use('/', require('../routes/home'))
    app.use('/store', require('../routes/store'))
    app.use('/about', require('../routes/about'))
    //  END ROUTING ////
    app.use(error);

}