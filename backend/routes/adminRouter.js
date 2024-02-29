const express=require('express')
const router=express.Router()
const adminController=require('../controller/adminController')

router.post('/adlogin',adminController.loginAdmin)
router.get('/getUser',adminController.getuser)
router.post('/search',adminController.searchUser)
router.delete('/delete/:id',adminController.deleteUser)
router.post('/update/:id',adminController.updateUser)
router.post('/adduser/',adminController.adduser)



module.exports=router