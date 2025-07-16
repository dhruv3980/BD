const express = require('express');
const app = express();

require("dotenv").config()
Port = process.env.PORT || 4040


// use middleware
app.use(express.json());
const cookieParser = require('cookie-parser')
app.use(cookieParser())


// cokkie parser kyo use kerte hain


const user = require('./routes/user') // map routes 
app.use("/api/v1", user);


// db connection


const {dbconnect} = require('./config/database')

dbconnect();

app.listen(Port, ()=>{

    console.log("App started successfully on port :", Port);
})








