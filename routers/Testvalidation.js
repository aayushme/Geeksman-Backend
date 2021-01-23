const express=require('express')
const router=express.Router()
const testvalidationcontroller=require('../controllers/Testvalidation-controller')
router.get('/gettesttoken/:id',testvalidationcontroller.testvalidation)
module.exports=router