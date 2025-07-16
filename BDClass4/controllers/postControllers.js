const  post = require('../models/postmodel');

exports.postController = async(request, response)=>{
    try{
        let {title, body} = request.body;

        let newpost = new post ({
            title, 
            body,
        })

        let savedPost = await newpost.save();

        response.status(200).json({
         
            post:savedPost,
            
            
        })

    }
    catch(err){
        response.status(500).json({
            error:err.message,
            message:"server error"
        })
    }
}

exports.fetchAllPost = async(request,response)=>{
    try{
        let allPost = await post.find().populate('comment').exec();
        response.status(200).json({
            data:allPost
        })
    }
    catch(error){
        response.status(500).json({
            error:err.message,
            message:"server error"
        })
    }
}