

const Todo = require("../models/Todo");

// define route handle
exports.createTodo = async(req, res)=>{
    try{
        // extract title and desc into the req body
        
        const{title, description} = req.body;

        // create a new Db entry
        const response = await Todo.create({title,description});

        // send a json response with a success flag

        res.status(200).json(
        {
            success:true,
            data:response,
            message:"Db entry creates Successfully"
        })
            

    }
    
    catch(err){

        console.error(err);
        res.status(500).json({
            success:false,
            data:"Internal server error",
            message: err.message,

        })
    }
}
