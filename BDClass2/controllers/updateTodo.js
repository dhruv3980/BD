const Todo = require('../models/Todo');

exports.updateTodo = async(req,res)=>{
    let {id} = req.params;

    try{
        let {title,description} = req.body;
        let updateTodo= await Todo.findByIdAndUpdate({_id:id},{title,description, updatedAt:Date.now()},{new:true});

        res.status(200).json({
            success:true,
            data:updateTodo,
            message:"Todo update successfully"
        })

    }
    catch(err){
        res.status(200).json({
            success:false,
            error:err.message,
            message:"Server Error"
        })
    }

}