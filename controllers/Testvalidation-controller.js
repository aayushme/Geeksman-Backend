const Contest=require('../models/Contest')
const jwt=require('jsonwebtoken')
const testvalidation=async (req,res,next)=>{
let time,contest,token,contestId
contestId=req.params.id
try{
contest=await Contest.findById(contestId)
}catch(e){
return res.status(404).json({error:e})
}
if(!contest){
return   res.status(404).json({message:'Could not find the contest.'})
}
time=contest.contestduration
try{
token=jwt.sign({contestId:contestId},process.env.JWT_KEY,{expiresIn:`${time}`})
}catch(e){
    return res.status(500).json({message:'Could not start your test please try again later'})
}
res.status(201).json({token})
}
module.exports={
    testvalidation
}