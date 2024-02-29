const express=require('express')
const router=express.Router()
const userController=require('../controller/userController')
const upload = require('../Middleware/multer')


router.post('/signup',userController.registerUser)
router.post('/login',userController.loginUser)
router.post('/updateprofile/:id',upload.single('img'),userController.profileuploaded)


module.exports=router