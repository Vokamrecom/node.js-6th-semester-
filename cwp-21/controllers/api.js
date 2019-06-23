const express = require('express');
const cache = require('../services/cacheService');

module.exports = (agent, office, properties)=>{

    this.cache = cache;
    const router = express.Router();

    const propertiesController = require('./properties')(properties, this.cache);

    const agentController = require('./agent')(agent, cache);

    const officeController = require('./office')(office, cache);

    router.use('/properties', propertiesController);
    router.use('/agent', agentController);
    router.use('/office', officeController);

    return router;
};