const mongoose = require('mongoose');

require('dotenv').config();

const Mongodb_Url = process.env.Mongodb_Url;

exports.dbconnect = ()=>{
    mongoose.connect(Mongodb_Url)
    .then(()=>{
        console.log('Db connection successful')

    })
    .catch(err=>{
        console.log('failed To connect with db');
    })
}