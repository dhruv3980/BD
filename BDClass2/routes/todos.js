const express = require("express");
const router = express.Router();

// import conroller 
 
const {createTodo} = require("../controllers/createTode");

const {getTodos, getSingleTodo}  = require('../controllers/getTodos')

const {updateTodo}  = require('../controllers/updateTodo')

const {deleteTodo} = require('../controllers/deleteTodo')


// define api route
router.post('/createTodo', createTodo);
router.get('/getTodos', getTodos);
router.get('/getTodos/:id', getSingleTodo)
router.put('/updateTodo/:id', updateTodo)
router.delete('/deleteTodo/:id', deleteTodo)

module.exports = router;