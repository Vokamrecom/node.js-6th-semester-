const cache =require('../services/cacheService');
const logger = require('../services/loggerService');
module.exports = async (req, res, next)=>{
    if(req.method==='GET'){
       let value = await cache.getValue(req);
        if(value){
           await res.json(value);
           await logger.info(req.originalUrl+' '+req.method+' '+'From Cache');
           return;
       }
    }
    next();
};
