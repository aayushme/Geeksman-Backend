const express=require('express')
const registeredfestusercontroller=require('../controllers/registerfestusers-controller')
const router=express.Router()
router.get('/getUsers/:eid',registeredfestusercontroller.getUsers)
router.post('/registerforfestevent',registeredfestusercontroller.registerforEvent)
router.patch('/updateDetails/:id',registeredfestusercontroller.updatedetails)

module.exports=router