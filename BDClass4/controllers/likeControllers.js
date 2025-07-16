const Post = require('../models/postmodel');
const Like= require('../models/likemodel');

exports.likeController = async(req,res)=>{
    try{
        const {post, user} = req.body;

        const like = new Like({post, user});

        const savedlike = await like.save();

        // update the post in which the like array have
        const postupdate = await Post.findByIdAndUpdate(post,{$push:{like:savedlike._id}}, {new:true}).populate('like').exec();

        res.status(200).json({
            post:postupdate
        })

    }
    catch(err){
        res.status(404).json({

             error:"server error while like the post"
        })
       
    }
}

exports.unlikeController = async(req,res)=>{
    try{

        let {post, like} = req.body;

        let unlike = await Like.findByIdAndDelete(like);

        let updatedPost = await Post.findByIdAndUpdate(post,{$pull:{like:like}},{new:true}).populate('like');

        res.status(200).json({
            data:updatedPost
        })
    }
    catch(err){
        res.status(404).json({

             error:"server error while unlike the post"
        })
       
    }

}