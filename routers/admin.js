const express=require('express')
const controller=require('../controllers/admin-controller')
const middleware=require('../middleware/check-auth')
const router=express.Router()
router.post('/createadmin',middleware,controller.createadmin)
router.post('/loginadmin',controller.loginadmin)
module.exports=router