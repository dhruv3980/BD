const mongoose = require('mongoose');

require('dotenv').config();


exports.dbconnect = async()=>{
    try{
        await mongoose.connect(process.env.Mongodb_Url)

        console.log('Db connection successful')
        
    }

    catch(err){
        console.error(err);
        process.exit(1);
    }
}