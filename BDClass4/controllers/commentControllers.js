const post = require('../models/postmodel')

const comment = require('../models/commentmodel');


exports.commentController = async(req,res)=>{
    try{    
        let {post:PostId, user, body} = req.body;

        const newcomment = new comment(
            {post:PostId , user, body}
        )

        // save the comment in the db
        let savedcomment = await newcomment.save();

        // now also update the post in which comment is given

        let updatedPost = await post.findByIdAndUpdate(PostId, {$push:{comment:savedcomment._id}}, {new:true})
                            .populate('comment');

        res.status(200).json({
            post:updatedPost
        })
    }
    catch(error){
        res.status(500).json({
            error:error.message,
            message:"kuch gadbad ha server ki taraf se"
            
        })

    }

}
