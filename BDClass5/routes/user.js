const express = require('express');
const router = express.Router();

const user = require('../models/User')



// import controllers
const {signUp, login} = require('../controllers/Auth')
const{auth, isAdmin, isStudent} = require('../middlewares/auth')

// map controllers

router.post('/signUp', signUp);
router.post('/login', login);

// testing router 
router.get('/test', auth, (req,res)=>{
    res.json({
        success:true,
        message:"welcomet tpo the protected route for tests"

    })
})

// protected routes
router.get('/student', auth, isStudent, (req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route fot the students"
    })
} )

router.get('/admin', auth, isAdmin, (req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route for the admin"
    })
})

router.get('/hello', auth, async(req,res)=>{
    try{

        let data = await user.findById(req.user.id)

        res.status(200).json({
            success:true,
            data:data
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:"error whule fatching data from db"
        })

    }
})

// export router

module.exports  = router;