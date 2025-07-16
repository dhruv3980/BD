const Todo = require('../models/Todo')

exports.deleteTodo = async(req,res)=>{
    try{

        let {id} = req.params;
        
        let todo = await Todo.findByIdAndDelete({_id:id});

        res.status(200).json({
            success:true,
            data:todo,
            message:"todo deleted"
        })
    }
    catch(err){
        res.status(200).json({
            success:false,
            error:err.message,
            message:"server Error"
        })

    }
}