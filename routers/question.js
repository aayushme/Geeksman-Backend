const express=require('express')
const router=express.Router()
const questioncontroller=require('../controllers/question-controller')
router.post('/testquestions',questioncontroller.getshuffledpertest)
//get all questions
router.get('/questions',questioncontroller.getallquestions)
//get questionbyid
router.get('/questions/:id',questioncontroller.getquestionbyid)
router.post('/questions',questioncontroller.createquestion)  
router.patch('/questions/:id',questioncontroller.updatequestion)
router.delete('/questions/:id',questioncontroller.deletequestion)
module.exports=router