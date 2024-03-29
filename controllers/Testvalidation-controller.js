const Contest=require('../models/Contest')
const jwt=require('jsonwebtoken')
const User=require('../models/User')
const testvalidation=async (req,res,next)=>{
let time,contest,token;
const {cid,uid}=req.body
const user=await User.findById(uid).populate('usercontestdetail')
if(user||user.usercontestdetail.length!=0){
    const finduser=user.usercontestdetail.find(user=>user.ContestId==cid)
    if(finduser.testgiven){
        return res.json({message:'You have already given the test'});
    }
}
try{
contest=await Contest.findById(cid)
}catch(e){
return res.status(404).json({error:e})
}
if(!contest){
return   res.status(404).json({message:'Could not find the contest.'})
}
time=contest.contestduration
try{
token=jwt.sign({contestId:cid,userId:uid},process.env.JWT_KEY,{expiresIn:`${time}`})
}catch(e){
    return res.status(500).json({message:'Could not start your test please try again later'})
}
res.status(201).json({token})
}
module.exports={
    testvalidation
}