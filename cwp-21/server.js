const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const properties = require('./services/properies');
const agent = require('./services/agent');
const office = require('./services/office');
const router = require('./controllers/api');
const error = require('./global-controllers/error');
const logger = require('./global-controllers/logger');
const cache = require('./global-controllers/cache');

module.exports =(db) =>{
    const app = express();

    app.use(bodyParser.json());
    let agentObject = new agent(db.agent,{});
    let officeObject = new office(db.office,{});
    let propertiesObject = new properties(db.properties,{});
    app.use('/api',logger);
    app.use('/api',cache);
    app.use('/api',router(agentObject,officeObject,propertiesObject));
    app.use('/api',error);
    return app;
};
