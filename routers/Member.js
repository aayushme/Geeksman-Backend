const express=require('express')
const router=express.Router();
const middleware=require('../middleware/check-auth')
const controller=require('../controllers/members-controller')
router.post('/createmember',middleware,controller.createmember);
router.get('/getmember',controller.getmembers);
router.patch('updatemember/:mid',middleware,controller.updatemember);
router.delete('deletemember/:mid',middleware,controller.deletemember);
module.exports=router