const mongoose = require('mongoose');

// require dotenv file 

require('dotenv').config();

const dbconnect = ()=>{
    mongoose.connect(process.env.Mongodb_Url)
    .then(()=>{
        console.log("Db connection successful")
    })
    .catch(err=>{
        console.error(err);
        console.log("connection with db failed");

    })
}

module.exports = dbconnect