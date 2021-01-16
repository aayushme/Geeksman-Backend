const express=require('express')
const router=express.Router()
const submissioncontroller=require('../controllers/submission-controller')
router.post('/submit',submissioncontroller.submissionhandler)
module.exports=router