const Todo = require('../models/Todo'); // require Model

exports.getTodos = async(req,res)=>{
    try{
        let todo = await Todo.find({});

        res.status(200).json({
            success:true,
            data:todo,
            message:"all enteries of todos"
        })

    }
    catch(err){
        res.status(500).json({
            success:false,
            error:err.message,
            message:"server error"
        })


    }
}

exports.getSingleTodo = async(req,res)=>{
    try{

        let {id} = req.params;
        let todo = await Todo.findById({_id:id});

        if(!todo){
            res.status(404).json({
                success:false,
                
                message:"id is wrong"
            })

        }
        else{
            res.status(200).json({
                success:true,
                data:todo,
                message:"todo fetch successfully"
            })
        }

        
    }
    catch(err){
        res.status(200).json({
            success:false,
            error:err.message,
            message:"something went wrong"

        })

    }
}

