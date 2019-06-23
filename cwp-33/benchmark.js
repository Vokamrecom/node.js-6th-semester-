/**
 * Created by annae on 10.04.2018.
 */
const siege = require('siege');


siege("node " + __dirname + "/index.js")
    .on(3000)
    .concurrent(50)
    .for(120).seconds
    .get('/hash')
    .attack();
/*

 GET:/hash
 done:256        errors:146
 200 OK: 256
 rps: 2
 response: 727ms(min)    32285ms(max)    15815ms(avg)
 */

//pm2 start index.js-i 0
/*siege()
    .on(3000)
    .concurrent(50)
    .for(120)
    .seconds.get("http://localhost:3000/hash")
    .attack();

/*GET:http://localhost:3000/hash
 done:511        errors:96
 200 OK: 511
 rps: 4
 response: 574ms(min)    49198ms(max)    8055ms(avg)
*/