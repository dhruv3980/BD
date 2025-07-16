const User = require('../models/User');
const bcrypt = require('bcrypt')

const jwt =  require('jsonwebtoken');
require('dotenv').config();

/*
    fetch data from req.body
    check if user already register or not 
    if yes then return 
    else hash the password
    after hashing create a new entry in db and send the res that user created successfully

 */

exports.signUp = async(req,res)=>{
    try{
        // fetch all data from the req body
        const {name, email, password, role} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
           return res.status(400).json({
                success:false,
                message:'User already exist'
            })

        }

        // password secure kero
    
        else{

            let hashPassword;
            try{
                hashPassword = await bcrypt.hash(password,10)
            }

            catch(err){
                return res.status(500).json({
                    success:false,
                    message:'Error while hashing'
                })

            }

            // create entry for user

            const user = await User.create({
                name, 
                email,
                password:hashPassword, 
                role
            })

            return res.status(200).json({
                success:true,
                message:"user created successfully"
            })


        }

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"user can't be  created please try again later "

        })

    }

}


exports.login = async(req,res)=>{

try{


    const {email, password} = req.body;

    // first check we send email  and password or not
    if(!email || !password ){
        return res.status(400).json({
            success:false,
            message:'enter correct email and password'
        })
    }
    else{
        // now check whether the user exist or not 
        let user = await User.findOne({email});
       

       

        if(user){
             let payload = {
                email:user.email,
                id:user._id,
                role:user.role
            }
            // check if user password is right or not
            let validate = await bcrypt.compare(password, user.password);

            if(validate){
                let token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn:"2h"
                    })
                user = user.toObject()
                user.token = token;
                user.password = undefined;

                const options = {
                    expires: new Date(Date.now() + 24 * 60 *60 *1000 *3),
                    httpOnly:true
                }

                res.cookie('token', token, options).status(200).json({
                    success:true,
                    token,
                    user,
                    message:"Loged in successfully"
                })


            }


            else{
                return res.status(403).json({
                    success:false,
                    message:"your password is wrong"
                })
            }

        }
        else{
            return res.json(401).json({
                success:false,
                message:"User is not reqistered go to signup page"
            })
        }
    }
}
catch(err){
    return res.status(500).json({
        success:false,
        message:'Login Failure'
    })


}}
