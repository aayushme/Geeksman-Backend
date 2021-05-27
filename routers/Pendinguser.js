const express=require('express')
const router=express.Router()
const middleware=require('../middleware/check-auth')
const controller=require('../controllers/Pendinguser-controller')
router.get('/getpendinguser',middleware,controller.getPendingusers)
router.delete('/deletependinguser',middleware,controller.deletePendinguser)
module.exports=router