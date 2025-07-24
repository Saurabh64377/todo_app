const express = require('express')
const userController = require('../controller/userController')
const verifyToken = require('../middleware/verifyToken')

const router = express.Router();

router.post('/register' , userController.registerUser)
router.post('/login' , userController.loginUser)
router.get('/alluser' , userController.allUsers)
router.get('/user' , verifyToken,userController.userFindById)



module.exports = router