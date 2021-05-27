const PendingUser=require('../models/PendingUser')

//This route returns all the pending users
const getPendingusers=async (req,res,next)=>{
let pendinguser;
try{
pendinguser=await PendingUser.find({})
}catch(e){
    return res.status(500).json({"message":e})
}
if(!pendinguser){
    return res.status(404).json({"message":"There are no pending users!!"})
}
return res.status(200).json({pendinguser:pendinguser.map(pending=>pending.toObject({getters:true}))})
}

//This route deletes the pending user with given id
const deletePendinguser=async (req,res,next)=>{
let pendinguser;
const {pendingid}=req.body
try{
pendinguser=await PendingUser.findById(pendingid)
}catch(e){
return res.status(500).json({"message":e})
}
if(pendinguser){
    await pendinguser.remove();
}
return res.status(200).json({"message":"Deleted successfully !!"})
}
module.exports={
    getPendingusers,
    deletePendinguser
}