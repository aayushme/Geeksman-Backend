const express=require('express')
const registeredusercontroller=require('../controllers/registeruser-controller')
const router=express.Router()
router.get('/getUsers/:cid',registeredusercontroller.getUsers)
router.post('/registerforcontest',registeredusercontroller.registerforcontest)
router.patch('/updateDetails/:id',registeredusercontroller.updatedetails)

module.exports=router