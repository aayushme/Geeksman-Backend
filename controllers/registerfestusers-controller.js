const FestEvent=require('../models/FestEvents')
const User=require('../models/User')
const FestEventRegisteredUser=require('../models/FestEventRegistereduser')
const getUsers=async (req,res,next)=>{
const eventid=req.params.eid
let eventwithregistereduser;
try{
eventwithregistereduser=await FestEvent.findById(eventid).populate('registeredusers')
}catch(err){
return res.status(500).json({err})
}
if(!eventwithregistereduser||eventwithregistereduser.registeredusers.length===0){
    return res.status(404).json({message:"There are no registered users uptil now"})
}
return res.status(200).json({data:eventwithregistereduser.registeredusers})
}
const registerforEvent=async (req,res,next)=>{
const {uid,eid}=req.body
let event,user;
try{
event=await FestEvent.findById(eid)
user=await User.findById(uid)
if(user){ 
    let registereduser=await FestEventRegisteredUser.findOne({email:user.email})
    if(registereduser){
        return res.json({
            message: "you are already registered.",
            registereduser,
          });
    }
}
}catch(e){
    return res.status(500).json({e})
}
if (!event) {
    return res
      .status(404)
      .json({
        error:
          "Could not find the Event that you are trying to register for,please try again later",
      });
  }
  if (!user) {
    return res
      .status(404)
      .json({ error: "Could not find the user,please try again later" });
  }

  let newuser = new FestEventRegisteredUser({
    Name: user.name,
    email: user.email,
    PhoneNo: user.phoneno,
    college: user.college,
    year: user.year,
    Branch: user.Branch,
    EventId: cid,
  });
  await newuser.save()

  try{
    const sess = await mongoose.startSession();
        sess.startTransaction();
        newuser.Eventname = event.Eventname;
        await newuser.save({ session: sess });
        event.registeredusers.push(newuser);
        user.usereventdetail.push(newuser);
        await event.save({ session: sess });
        await user.save({ session: sess });
        await sess.commitTransaction();
  }catch(e){
      return res.status(500).json(e)
  }
  return res
  .status(200)
  .json({ message: "You have been registered!!" });
}
const updatedetails=async (req,res,next)=>{

}
module.exports={
    getUsers,
    registerforEvent,
    updatedetails
}