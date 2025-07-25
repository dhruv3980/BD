const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        
    },
    body:{
        type:String,
        required:true
    },

    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment"
    }],

    like:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"like"

        }
    ]

})

module.exports = mongoose.model('post', postSchema);