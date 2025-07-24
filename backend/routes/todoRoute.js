const express = require('express')
const todoController = require('../controller/todoController')
const verifyToken = require('../middleware/verifyToken')

const router = express.Router();


router.post('/addtodo' ,verifyToken, todoController.todoAdd)

router.get('/alltodo' , todoController.allTodo)

router.get('/usertodo' , verifyToken , todoController.usersTodo)

router.delete('/deletetodo/:id' , verifyToken , todoController.deleteTodo)

router.put('/edittodo/:id' , verifyToken , todoController.editTodo)

router.get('/findtodo/:id' , verifyToken , todoController.todoFindById)

module.exports = router;