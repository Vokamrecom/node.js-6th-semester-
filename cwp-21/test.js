const LRU = require("lru-cache");
const options =  { max: 5 , maxAge: 30 * 60 };
const cache = LRU(options);
const moment = require('moment');

cache.set('value','value');
let c = cache.get('value');
console.log(c);