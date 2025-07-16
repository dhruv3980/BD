
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.auth = (req,res,next)=>{
    try{
        // extract jwt token from req ki body
        // pending other ways to fetch jwt token

        const token =  req.cookies.token|| req.header('Authorization').replace("Bearer ","");

        // check token exist or not
        if(!token){

            return res.status(401).json({
                success:false,
                message:'token missing'
            })
        }

        // verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            console.log(decode);

            req.user=decode;
            
             next();

        } catch(err){
            return res.status(400).json({
                success:false,
                message:'token is invalid'
            })
        }
       

    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:"something went wrong while fetching token"
        })
    }

}


exports.isStudent = (req,res,next)=>{
    try{
        if(req.user.role!=='Student'){
            return res.status(400).json({
                success:false,
                message:"this is a protected route for the user"

            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"user role is not matching" 
        })
    }
}

exports.isAdmin = (req,res,next)=>{
    try{
        if(req.user.role!=='Admin'){
            return res.status(400).json({
                success:false,
                message:"this is a protected route for the Admin"

            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"user role is not matching" 
        })
    }
}