const express=require('express')
const router=express.Router()
const testvalidationcontroller=require('../controllers/Testvalidation-controller')
router.post('/gettesttoken',testvalidationcontroller.testvalidation)
module.exports=router