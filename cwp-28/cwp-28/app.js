'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const Sequelize = require('sequelize');
const configdb = require('./config.json');
const db = require('./Context/db')(Sequelize, configdb);

module.exports = app; // for testing

var config = {
    appRoot: __dirname // required config
};

SwaggerExpress.create(config, async function(err, swaggerExpress) {
    if (err) { throw err; }

    // install middleware
    swaggerExpress.register(app);

    var port = process.env.PORT || 3000;
    await db.sequelize.sync({force:true});

    app.listen(port);

    if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
    }
});
