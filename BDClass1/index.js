const express = require("express");
const app = express();


// MiddleWare parser
const bodyparser = require("body-parser");
app.use(bodyparser.json());






app.listen(8080, ()=>{
    console.log("server is running on port 8080");
})

app.get("/", (req,res)=>{
    req.send("Get request successful recieved");
})

app.post("/api", (req,res)=>{
    const{ name, brand} = req.body;
    console.log(name, brand);
    res.send("Post req successful received")
    
})


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/BDClassOne")
.then(()=>{ 
    console.log("Connected to MongoDB successfully");
   

}
).catch((err)=>{
    console.log("error to connect with db ")
})