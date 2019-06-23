const moment = require('moment');
const logger = require('../services/loggerService');

module.exports = (req, res, next) => {
    let date = moment().format('DD.MM.YYYY HH:mm:ss ');
    let URL = req.originalUrl;
    let method = req.method;
    let body = JSON.stringify(req.body);
    let query = JSON.stringify(req.query);

    logger.info(date+' '+URL+' '+method+' '+body+' '+query);

    next();
};