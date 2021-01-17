const express=require('express')
const registeredusercontroller=require('../controllers/registeruser-controller')
const router=express.Router()
router.get('/getUsers',registeredusercontroller.getUsers)
router.post('/registerForContest',registeredusercontroller.registerforcontest)
router.patch('/updateDetails/:id',registeredusercontroller.updatedetails)
router.delete('/deleteuser/:id',registeredusercontroller.deleteuser)
module.exports=router