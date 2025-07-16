const mongoose =require("mongoose");
require("dotenv").config()

const dbconnect = ()=>{
    mongoose.connect(process.env.Mongodb_Url)
    .then(()=>{
        console.log("Db connection successful")
    })
    .catch((err)=>{
        console.log(" Db connection failed")
        console.error(err);

        process.exit(1);

    })
}

module.exports = dbconnect;