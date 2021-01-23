const express=require('express')
const router=express.Router()
const verificationcontroller=require('../controllers/verification-controller')
router.get('/activate/user/:hash',verificationcontroller.verificationhandler)
router.get('/changepassword/:hash',(req,res,next)=>{
let id=req.params.hash 
res.render('index',{userid:id})
})

module.exports=router