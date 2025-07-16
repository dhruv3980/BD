const express = require("express");
const app = express();

require("dotenv").config();

// add middleware to parse the json data
app.use(express.json());

// import route from routes
const routes = require("./routes/todos.js")
// db connection stablishment
const dbconnect = require('./config/database.js');

dbconnect();


app.use('/api/v1', routes);

app.get('/', (req,res)=>{
    res.send(`<h1>Home Page Baby</h1>`)
});


app.listen(process.env.PORt, ()=>{
    console.log("app started successfully")
})