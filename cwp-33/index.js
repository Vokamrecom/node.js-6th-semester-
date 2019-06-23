/**
 * Created by annae on 10.04.2019.
 */
const express = require('express');
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.get('/hash',(req,res)=>{
res.json(getHash());
});

function getHash() {
    let result = uuidv4() ;
    const salt = bcrypt.genSaltSync(8);
    for(let i = 0; i< 10; i++){
      result = bcrypt.hashSync(result, salt);
    }
    return result;
}

app.listen(port,()=>{
   console.log(`Server started at port: ${port}`) ;
});
