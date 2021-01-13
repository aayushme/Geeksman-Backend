const express=require('express')
const compilerrouter=require('../controllers/compiler-controller')
const router=express.Router()
router.post('/execute/compile',compilerrouter.compilehandler)
module.exports=router