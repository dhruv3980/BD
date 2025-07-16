const mongoose = require('mongoose')
const nodemailer = require("nodemailer");
require('dotenv').config();

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
})

fileSchema.post('save', async (docs)=> {
    try{
        const transporter = nodemailer.createTransport({
        host:process.env.HOST,
        port: process.env.PORT_SMTP,
        secure: false,

        auth:{
            user:process.env.USER,
            pass:process.env.PASSWORD
        }
    })

        let info = await transporter.sendMail({
            from:"Dhrv",
            to:`${docs.email}`,
            subject:"Db  entry successfully",
            html:`<p>Hello jee </p> </hr> <p> File upload successfully</p> </br> <h1>view more </h1> <a href="${docs.imageUrl}"> ${docs.imageUrl}`
        })
    }
    catch(err){
        console.log(err);
    }
    
})
module.exports = mongoose.model('File', fileSchema)
