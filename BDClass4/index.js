// server instanciate
const express =require('express');
const app = express();

// load env file
require('dotenv').config();

// use middleware
app.use(express.json());

Port = process.env.PORT || 4000

//require dbfile
const dbconnect = require('./config/database');
dbconnect();

// require route'
const routes = require('./routes/blog')

app.use('/api/v1', routes)


app.listen(Port, ()=>{
    console.log("app listen successfully");
})


