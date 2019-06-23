const LRU = require("lru-cache");
const options =  { max: 5000, maxAge: 60*60 * 60 };
const cache = LRU(options);
const moment = require('moment');

module.exports ={
     getValue: async (req)=>{
        let value =  cache.get(req.originalUrl.toString());
        return value;
    },
    setValue: async (req,data)=>{
          cache.set(req.originalUrl.toString(),data);
        let value =  cache.get(req.originalUrl.toString());
    },
    test:moment().format('HH:MM:SS')

};

