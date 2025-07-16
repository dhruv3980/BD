const express = require('express');
const app = express();
require('dotenv').config();

// find port no
const Port = process.env.Port || 3000 

// add middleware
app.use(express.json());
const fileUpload = require("express-fileupload")
app.use(fileUpload({
     useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// make db connection 
const {dbconnect} = require('./config/Mongodb')
dbconnect();



// make cloudinary connection
const {connectcloudinary} = require('./config/Cloundinary')
connectcloudinary()

// route mount
const upload = require('./router/FileUpload')
app.use('/api/v1/upload', upload);

// server start

app.listen(Port, ()=>{
    console.log("server started successfully");
})


